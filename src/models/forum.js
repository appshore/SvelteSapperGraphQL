import mongoose from 'mongoose'

export const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  slug: { type: String, required: true },
  html: { type: String, required: true },
  createdAt: { type: Date, required: true},
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: true},
  updatedAt: { type: Date},
  updatedBy: { type: mongoose.Schema.Types.ObjectId}
})

export const postModel = mongoose.model('Post', postSchema, 'forumPosts')


export const tagSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  label: { type: String, required: true },
  createdAt: { type: Date, required: true},
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: true},
  updatedAt: { type: Date},
  updatedBy: { type: mongoose.Schema.Types.ObjectId}
})

export const tagModel = mongoose.model('Tag', tagSchema, 'forumTags')
