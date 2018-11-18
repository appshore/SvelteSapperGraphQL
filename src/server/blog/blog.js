import { blogModel } from '../../models/blog'
import { filterBlog } from './filter'
import { getUsers } from './users'

export const getBlog = (req, res) => {
  blogModel
    .findOne({ slug: req.params.slug })
    .exec()
    .then(async blog => {
      blog = JSON.parse(JSON.stringify(blog))

      // retrieve the user whom authored a blog
      let [user] = await getUsers([blog.userId])

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
  blogModel
    .findOne({ slug: req.params.slug })
    .exec()
    .then(async blog => {
      blog = JSON.parse(JSON.stringify(blog))

      // retrieve the user whom authored a blog
      let [user] = await getUsers([blog.userId])

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
