import mongoose from 'mongoose'

const PrivilegedSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  role: {
        type: String,
        enum: ['user', 'admin', 'developer', 'animalControl', 'dbModerator'],
        required: true
    },
},
    {
    timestamps: true
})

const Privileged = mongoose.model('Privileged', PrivilegedSchema)

export default Privileged