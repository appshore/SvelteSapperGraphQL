import mongoose from 'mongoose'

export const tagSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  code: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, required: true},
  createdBy: { type: mongoose.Schema.Types.ObjectId, required: true},
  updatedAt: { type: Date},
  updatedBy: { type: mongoose.Schema.Types.ObjectId}
})

export const tagModel = mongoose.model('Tag', tagSchema, 'forumTags')
