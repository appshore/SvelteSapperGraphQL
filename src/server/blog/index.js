import { blogModel } from '../../models/blog'

const blog = (req, res) => {
  // console.log('blog/slug', req.body, req.query)
  blogModel
    .find()
    .exec()
    .then(blogs => {
      blogs = JSON.parse(JSON.stringify(blogs))
      return res.status(200).json({
        blogs
      })
    })
    .catch(error => {
      res.status(500).json({
        error: error,
      })
    })
}

export default blog
