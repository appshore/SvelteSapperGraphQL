import formatRelative from 'date-fns/formatRelative'
import { enGB } from 'date-fns/locale'

// Only the info that we want to send to the client
export const filterPostInList = (post, user) => {
  return {
    title: post.title,
    slug: post.slug,
    html:
      post.html
        .substring(0, 200)
        .split('</')
        .splice(0, 2)
        .join('</') + '...',
    timestamp: formatRelative(post.createdAt, new Date(), { locale: enGB }),
    createdBy: user._id,
    username: user.username,
  }
}

// Only the info that we want to send to the client
export const filterPost = (post, user) => {
  return {
    title: post.title,
    slug: post.slug,
    html: post.html,
    timestamp: formatRelative(post.createdAt, new Date(), { locale: enGB }),
    createdBy: user._id,
    username: user.username,
  }
}
