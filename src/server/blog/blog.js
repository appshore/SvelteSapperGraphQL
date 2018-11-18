import mongoose from 'mongoose'
import slug from 'slug'

import { blogModel } from '../../models/blog'
import { filterBlog } from './filter'
import { getUsersByIds } from '../users/users'

export const getBlog = (req, res) => {
  blogModel
    .findOne({ slug: req.params.slug })
    .exec()
    .then(async blog => {
      blog = JSON.parse(JSON.stringify(blog))

      // retrieve the user whom authored a blog
      let [user] = await getUsersByIds([blog.createdBy])

      // the slug of the next and previous articles
      let nextSlug = await blogModel.findOne({ createdAt:{$gt: new Date(blog.createdAt)}}, {slug:1}).sort({createdAt:1}).exec()
      let prevSlug = await blogModel.findOne({ createdAt:{$lt: new Date(blog.createdAt)}}, {slug:1}).sort({createdAt:-1}).exec()

      // add user info to each blog then filter it to remove unwanted fields
      return res.status(200).json({
        blog: filterBlog(blog, user),
        nextSlug:nextSlug && nextSlug.slug,
        prevSlug:prevSlug && prevSlug.slug
      })
    })
    .catch(error => {
      res.status(500).json({
        error: error,
      })
    })
}

export const setBlog = (req, res) => {
  console.log('blog/blog/setBlog', req.user, req.body)

  let timestamp = new Date()
  let blog = new blogModel({
    _id: new mongoose.Types.ObjectId(),
    // slug: slug(`${req.body.title} ${timestamp.getTime()}`, {lower: true}),
    slug: slug(req.body.title, {lower: true}),
    title: req.body.title,
    html: req.body.html,
    createdAt: timestamp,
    createdBy: req.user._id
  })

  blog
    .save()
    .then(async result => {
      result = JSON.parse(JSON.stringify(result))

      console.log('blog/blog/setBlog saved', result)

      // retrieve the user whom authored a blog
      let [user] = await getUsersByIds([result.createdBy])

      // the slug of the next and previous articles
      let nextSlug = await blogModel.findOne({ createdAt:{$gt: new Date(blog.createdAt)}}, {slug:1}).sort({createdAt:1}).exec()
      let prevSlug = await blogModel.findOne({ createdAt:{$lt: new Date(blog.createdAt)}}, {slug:1}).sort({createdAt:-1}).exec()

      res.status(200).json({
        success: 'New blog',
        blog: filterBlog(result, user),
        nextSlug:nextSlug && nextSlug.slug,
        prevSlug:prevSlug && prevSlug.slug
      })
    })
    .catch(error => {
      console.error('blog/blog/setBlog saved', error)
      res.status(500).json({
        error,
      })
    })
}
