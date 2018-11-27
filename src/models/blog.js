import mongoose from 'mongoose'

import {tagSchema} from './tag'

export const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  slug: { type: String, required: true },
  html: { type: String, required: true },
  tags: [mongoose.Schema.Types.ObjectId],
  createdAt: { type: Date, required: true},
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: true},
  updatedAt: { type: Date},
  updatedBy: { type: mongoose.Schema.Types.ObjectId}
})

export const postModel = mongoose.model('post', postSchema, 'blogPosts')
export const tagModel = mongoose.model('Tag', tagSchema, 'blogTags')