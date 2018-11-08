import blogs from './_blogs.js'

const contents = JSON.stringify(
  blogs.map(blog => {
    return {
      title: blog.title,
      slug: blog.slug
    }
  })
)

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  })

  res.end(contents)
}
