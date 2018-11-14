import { blogModel } from '../../models/blog'
import { filterSlug } from './filter'
import { getUsers } from './users'

const slug = (req, res) => {
  // console.log('blog/slug', req.body, req.query, req.params)
  blogModel
    .findOne({ slug: req.params.slug })
    .exec()
    .then(async blog => {
      blog = JSON.parse(JSON.stringify(blog))

      // retrieve the user whom authored a blog
      let [user] = await getUsers([blog.userId])

      // add user info to each blog then filter it to remove unwanted fields
      return res.status(200).json({
        blog: filterSlug(blog, user),
      })
    })
    .catch(error => {
      res.status(500).json({
        error: error,
      })
    })
}

export default slug
