import mongoose from 'mongoose'

export const blogSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  slug: { type: String, required: true },
  html: { type: String, required: true },
})

export const blogModel = mongoose.model('Blog', blogSchema)
