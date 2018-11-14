import formatRelative from 'date-fns/formatRelative'
import { enGB } from 'date-fns/locale'

// Only the info that we want to send to the client
export const filterBlog = (blog, user) => {
  return {
    title: blog.title,
    slug: blog.slug,
    content: blog.html
      .substring(0, 200)
      .split('</')
      .splice(0, 2)
      .join('</')+'...',
    // content: blog.html
    //   .split(' ')
    //   .splice(0, 10)
    //   .join(' '),
    timestamp: formatRelative(blog.createdAt, new Date(), {locale: enGB}),
    userId: user._id,
    username: user.username,
  }
}

// Only the info that we want to send to the client
export const filterSlug = (blog, user) => {
  return {
    title: blog.title,
    slug: blog.slug,
    content: blog.html,
    timestamp: formatRelative(blog.createdAt, new Date(), {locale: enGB}),
    userId: user._id,
    username: user.username,
  }
}
