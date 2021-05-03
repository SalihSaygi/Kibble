import { axi as axios } from './axios'

async function getBots() {
    try {
        const { data } = await axios.get('/api/bots')
        return data
    } catch (err) {
        console.error(err);
    }
}

async function getBot(id) {
    try {
        const { data } = await axios.get(`/api/bots/${id}`)
        return data
    } catch (err) {
        console.error(err)
    }
}

async function updateBot(id, bot) {
    try {
        const { data } = await axios.put(`api/bots/${id}`, bot)
        return data
    } catch(err) {
        console.error(err)
    }
}

export { getBot, updateBot, getBots }