import { blogModel } from '../../models/blog'
import { filterSlug } from './filter'
import { getUsers } from './users'

const slug = (req, res) => {
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
        blog: filterSlug(blog, user),
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

export default slug
