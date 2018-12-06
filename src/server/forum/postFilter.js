import formatRelative from 'date-fns/formatRelative'
import { enGB } from 'date-fns/locale'
import htmlToText from 'html-to-text'

// Only the info that we want to send to the client
export const filterPostInList = (post, user) => {
  return {
    title: post.title,
    slug: post.slug,
    // html: post.html
    //   .substring(0, 200)
    //   .split('</')
    //   .splice(0, 2)
    //   .join('</') + '...',
    html: htmlToText.fromString(post.html).substring(0, 200),
    tags: post.tags,
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
    tags: post.tags,
    timestamp: formatRelative(post.createdAt, new Date(), { locale: enGB }),
    createdBy: user._id,
    username: user.username,
  }
}
