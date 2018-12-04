import mongoose from 'mongoose'
import sanitizeHtml from 'sanitize-html'
import slug from 'slug'

import { postModel } from '../../models/forum'
import { filterPost } from './filter'
import { findUsersByIds } from '../user/users'

export const deletePost = (req, res) => {
  postModel
    .deleteOne({ slug: req.params.slug })
    .exec()
    .then(() => {
      return res.status(200).json({
        post: null
      })
    })
    .catch(error => {
      return res.status(500).json({
        error: error
      })
    })
}

export const findPost = (req, res) => {
  postModel
    .findOne({ slug: req.params.slug })
    .exec()
    .then(async result => {
      result = JSON.parse(JSON.stringify(result))

      // retrieve the user whom authored a post
      let [user] = await findUsersByIds([result.createdBy])

      // the slug of the next and previous posts
      let nextSlug = await postModel
        .findOne({ createdAt: { $gt: new Date(result.createdAt) } }, { slug: 1 })
        .sort({ createdAt: 1 })
        .exec()
      let prevSlug = await postModel
        .findOne({ createdAt: { $lt: new Date(result.createdAt) } }, { slug: 1 })
        .sort({ createdAt: -1 })
        .exec()

      // add user info to each post then filter it to remove unwanted fields
      return res.status(200).json({
        post: filterPost(result, user),
        nextSlug: nextSlug && nextSlug.slug,
        prevSlug: prevSlug && prevSlug.slug
      })
    })
    .catch(error => {
      return res.status(500).json({
        error: error
      })
    })
}

export const savePost = async (req, res) => {
  let post = new postModel({
    _id: new mongoose.Types.ObjectId(),
    slug: `${Date.now().toString(36)}-${slug(req.body.title, { lower: true })}`,
    title: req.body.title,
    tags: req.body.tags,
    html: sanitizeHtml(req.body.html, {allowedTags: false, allowedAttributes: false}),
    createdAt: new Date(),
    createdBy: req.user._id
  })

  post
    .save()
    .then(async result => {
      result = JSON.parse(JSON.stringify(result))

      // retrieve the user whom authored a post
      let [user] = await findUsersByIds([result.createdBy])

      // the slug of the next and previous posts
      let nextSlug = await postModel
        .findOne({ createdAt: { $gt: new Date(result.createdAt) } }, { slug: 1 })
        .sort({ createdAt: 1 })
        .exec()
      let prevSlug = await postModel
        .findOne({ createdAt: { $lt: new Date(result.createdAt) } }, { slug: 1 })
        .sort({ createdAt: -1 })
        .exec()

      return res.status(200).json({
        post: filterPost(result, user),
        nextSlug: nextSlug && nextSlug.slug,
        prevSlug: prevSlug && prevSlug.slug
      })
    })
    .catch(error => {
      return res.status(500).json({
        error
      })
    })
}

export const updatePost = async (req, res, next) => {
  let dataSet = {
    slug: slug(req.body.title, { lower: true }),
    title: req.body.title,
    tags: req.body.tags,
    html: sanitizeHtml(req.body.html, {allowedTags: false, allowedAttributes: false}),
    updatedAt: new Date(),
    updatedBy: req.user._id
  }

  // check that title and slug are not already taken
  let checkPost = await postModel
  .findOne({ slug: dataSet.slug }, { slug: 1, title: 1 })
  .exec()
  .then(result => JSON.parse(JSON.stringify(result)))

  if( checkPost && checkPost.slug === dataSet.slug && req.body.slug !== dataSet.slug ) {
    return res.status(200).json({
      error: 'Title already in use'
    })
  }

  postModel
    .updateOne({ slug: req.params.slug }, { $set: dataSet })
    .then( async () => {
      req.params.slug = dataSet.slug // in case title has been modified
      return await findPost(req, res, next)
    })
    .catch(error => {
      return res.status(500).json({
        error
      })
    })
}
