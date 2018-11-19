import mongoose from 'mongoose'
import slug from 'slug'

import { blogModel } from '../../models/blog'
import { filterBlog } from './filter'
import { getUsersByIds } from '../users/users'

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
      let [user] = await getUsersByIds([result.createdBy])

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

export const saveBlog = (req, res) => {
  let blog = new blogModel({
    _id: new mongoose.Types.ObjectId(),
    slug: slug(req.body.title, { lower: true }),
    title: req.body.title,
    html: req.body.html,
    createdAt: new Date(),
    createdBy: req.user._id
  })

  blog
    .save()
    .then(async result => {
      result = JSON.parse(JSON.stringify(result))

      // retrieve the user whom authored a blog
      let [user] = await getUsersByIds([result.createdBy])

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
    html: req.body.html,
    updatedAt: new Date(),
    updatedBy: req.user._id
  }

  blogModel
    .updateOne({ slug: req.params.slug }, { $set: dataSet })
    .then( () => {
      req.params.slug = dataSet.slug // in case title has been modified
      return findBlog(req, res, next)
    })
    .catch(error => {
      return res.status(500).json({
        error
      })
    })
}
