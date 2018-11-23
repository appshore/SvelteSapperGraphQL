import mongoose from 'mongoose'

export const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dateOfBirth: { type: Date },
  role: { type: String, required: true, default: 'Guest' },
  createdAt: { type: Date, required: true},
  createdBy: { type: mongoose.Schema.Types.ObjectId},
  updatedAt: { type: Date},
  updatedBy: { type: mongoose.Schema.Types.ObjectId}
})

export const userModel = mongoose.model('User', userSchema)


