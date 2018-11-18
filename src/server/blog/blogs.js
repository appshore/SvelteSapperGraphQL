import { blogModel } from '../../models/blog'
import { filterBlogInList } from './filter'
import { getUsersByIds } from '../users/users'

export const getBlogs = (req, res) => {
  blogModel
    .find()
    .exec()
    .then(async blogs => {
      blogs = JSON.parse(JSON.stringify(blogs))

      // retrieve the users whom authored a blog
      let users = await getUsersByIds(blogs.map(f => f.userId))

      // add user info to each blog then filter it to remove unwanted fields
      return res.status(200).json({
        blogs: blogs.map( blog => filterBlogInList(blog, users.find( user => blog.userId == user._id)))
      })
    })
    .catch(error => {
      res.status(500).json({
        error: error,
      })
    })
}
