import mongoose from 'mongoose'

export const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true},
  createdBy: { type: mongoose.Schema.Types.ObjectId},
  updatedAt: { type: Date},
  updatedBy: { type: mongoose.Schema.Types.ObjectId}
})

export const userModel = mongoose.model('User', userSchema)


