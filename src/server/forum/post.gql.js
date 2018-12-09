import formatRelative from 'date-fns/formatRelative'
import { enGB } from 'date-fns/locale'
import htmlToText from 'html-to-text'

import { postModel } from '../../models/forumPost'

// Only the info that we want to send to the client
export const filterForumPost = post => {
  return {
    _id: post._id,
    title: post.title,
    slug: post.slug,
    html: post.html,
    createdBy: post.createdBy,
    tags: post.tags,
    timestamp: formatRelative(post.createdAt, new Date(), { locale: enGB })
  }
}

export const filterForumPostInList = post => {
  return {
    _id: post._id,
    title: post.title,
    slug: post.slug,
    html: htmlToText.fromString(post.html).substring(0, 200),
    createdBy: post.createdBy,
    tags: post.tags,
    timestamp: formatRelative(post.createdAt, new Date(), { locale: enGB })
  }
}

export const findForumPost = async (cond = {}) => {
  console.log('forum/gql/findPost', cond, JSON.stringify(cond), JSON.parse(cond))
  return await postModel
    .findOne(JSON.parse(cond))
    .exec()
    .then(post => filterForumPost(JSON.parse(JSON.stringify(post))))
    .catch(error => {
      error
    })
}

export const findForumPosts = async (cond = {}, sort = { createdAt: -1 }) => {
  console.log('forum/gql/findPosts', cond, sort)
  return await postModel
    .find(cond)
    .sort(sort)
    .exec()
    .then(posts => {
      posts = JSON.parse(JSON.stringify(posts))
      console.log('forum/gql/findPosts posts', posts)
      return posts.map(post => filterForumPostInList(post))
    })
    .catch(error => {
      error
    })
}
