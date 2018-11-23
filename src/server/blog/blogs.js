import { blogModel } from '../../models/blog'
import { filterBlogInList } from './filter'
import { findUsersByIds } from '../user/users'

export const findBlogs = (req, res) => {
  blogModel
    .find()
    .sort({createdAt:-1})
    .exec()
    .then(async blogs => {
      blogs = JSON.parse(JSON.stringify(blogs))

      // retrieve the users whom authored a blog
      let users = await findUsersByIds(blogs.map(f => f.createdBy))

      // add user info to each blog then filter it to remove unwanted fields
      return res.status(200).json({
        blogs: blogs.map( blog => filterBlogInList(blog, users.find( user => blog.createdBy == user._id)))
      })
    })
    .catch(error => {
      res.status(500).json({
        error: error,
      })
    })
}
