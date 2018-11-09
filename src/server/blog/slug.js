import { blogModel } from '../../models/blog'

const slug = (req, res) => {
  // console.log('blog/slug', req.body, req.query, req.params)
  blogModel
    .findOne({ slug: req.params.slug })
    .exec()
    .then(blog => {
      blog = JSON.parse(JSON.stringify(blog))

      return res.status(200).json({
        blog,
      })
    })
    .catch(error => {
      res.status(500).json({
        error: error,
      })
    })
}

export default slug
