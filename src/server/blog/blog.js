import mongoose from 'mongoose'
import sanitizeHtml from 'sanitize-html'
import slug from 'slug'

import { blogModel } from '../../models/blog'
import { filterBlog } from './filter'
import { findUsersByIds } from '../user/users'

export const deleteBlog = (req, res) => {
  blogModel
    .deleteOne({ slug: req.params.slug })
    .exec()
    .then(() => {
      return res.status(200).json({
        blog: null
      })
    })
    .catch(error => {
      return res.status(500).json({
        error: error
      })
    })
}

export const findBlog = (req, res) => {
  blogModel
    .findOne({ slug: req.params.slug })
    .exec()
    .then(async result => {
      result = JSON.parse(JSON.stringify(result))

      // retrieve the user whom authored a blog
      let [user] = await findUsersByIds([result.createdBy])

      // the slug of the next and previous articles
      let nextSlug = await blogModel
        .findOne({ createdAt: { $gt: new Date(result.createdAt) } }, { slug: 1 })
        .sort({ createdAt: 1 })
        .exec()
      let prevSlug = await blogModel
        .findOne({ createdAt: { $lt: new Date(result.createdAt) } }, { slug: 1 })
        .sort({ createdAt: -1 })
        .exec()

      // add user info to each blog then filter it to remove unwanted fields
      return res.status(200).json({
        blog: filterBlog(result, user),
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

export const saveBlog = async (req, res) => {
  let blog = new blogModel({
    _id: new mongoose.Types.ObjectId(),
    slug: slug(req.body.title, { lower: true }),
    title: req.body.title,
    html: sanitizeHtml(req.body.html, {allowedTags: false, allowedAttributes: false}),
    createdAt: new Date(),
    createdBy: req.user._id
  })

  // check that title and slug are not already taken
  let checkBlog = await blogModel
    .findOne({ slug: blog.slug }, { slug: 1, title: 1 })
    .exec()
    .then(result => JSON.parse(JSON.stringify(result)))

  if( checkBlog.slug === blog.slug && checkBlog.title === blog.title ) {
    return res.status(200).json({
      error: 'Title already in use'
    })
  }

  blog
    .save()
    .then(async result => {
      result = JSON.parse(JSON.stringify(result))

      // retrieve the user whom authored a blog
      let [user] = await findUsersByIds([result.createdBy])

      // the slug of the next and previous articles
      let nextSlug = await blogModel
        .findOne({ createdAt: { $gt: new Date(result.createdAt) } }, { slug: 1 })
        .sort({ createdAt: 1 })
        .exec()
      let prevSlug = await blogModel
        .findOne({ createdAt: { $lt: new Date(result.createdAt) } }, { slug: 1 })
        .sort({ createdAt: -1 })
        .exec()

      return res.status(200).json({
        blog: filterBlog(result, user),
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

export const updateBlog = (req, res, next) => {
  let dataSet = {
    slug: slug(req.body.title, { lower: true }),
    title: req.body.title,
    html: sanitizeHtml(req.body.html, {allowedTags: false, allowedAttributes: false}),
    updatedAt: new Date(),
    updatedBy: req.user._id
  }

  blogModel
    .updateOne({ slug: req.params.slug }, { $set: dataSet })
    .then( async () => {
      req.params.slug = dataSet.slug // in case title has been modified
      return await findBlog(req, res, next)
    })
    .catch(error => {
      return res.status(500).json({
        error
      })
    })
}
