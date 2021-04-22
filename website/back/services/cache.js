import mongoose from 'mongoose'
import util from 'util'
import client from '../redisClient.js'
//Cache
client.get = util.promisify(client.get)
const exec = mongoose.Query.prototype.exec
mongoose.Query.prototype.cache = function(options = { time: 60 }) {
  this.useCache = true,
  this.time = options.time,
  this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name)

  return this
}
mongoose.Query.prototype.exec = async function() {
  if(!this.useCache) {
    return await exec.apply(this, arguments)
  }

  const key = JSON.stringify({
    ...this.getQuery()
  })
  const cacheValue = await client.hget(this.hashKey, key)

  if(cacheValue) {
    const doc = JSON.parse(cacheValue)

    const booArray = Array.isArray(doc)

    console.log("Cache Response from Redis")
    return booArray = booArray ? doc.map(d => new this.model(d)) : new this.model(doc)
    }

    const result = await exec.apply(this, arguments) 
    console.log(this.time)
    client.hset(this.hashKey, key, JSON.stringify(result))
    Client.expire(this.hashKey, this.time)

    console.log("Response from MongoDB")
    return result
}

const clearKey = (hashKey) => {
  client.del(JSON.stringify(hashKey))
}

export { 
    clearKey
}