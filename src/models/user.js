import mongoose from 'mongoose'

export const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true },
  password: { type: String, required: true },
})

export const userModel = mongoose.model('User', userSchema)


