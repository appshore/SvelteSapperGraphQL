import formatRelative from 'date-fns/formatRelative'
import { enGB } from 'date-fns/locale'

// Only the info that we want to send to the client
export const filterBlogInList = (blog, user) => {
  return {
    title: blog.title,
    slug: blog.slug,
    content:
      blog.html
        .substring(0, 200)
        .split('</')
        .splice(0, 2)
        .join('</') + '...',
    timestamp: formatRelative(blog.createdAt, new Date(), { locale: enGB }),
    userId: user._id,
    username: user.username,
  }
}

// Only the info that we want to send to the client
export const filterBlog = (blog, user) => {
  return {
    title: blog.title,
    slug: blog.slug,
    content: blog.html,
    timestamp: formatRelative(blog.createdAt, new Date(), { locale: enGB }),
    userId: user._id,
    username: user.username,
  }
}
