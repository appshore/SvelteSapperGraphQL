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

export const findForumPost = async ({ _id = '', slug = '' }) => {
  let cond = {}
  if (_id && _id.length) {
    cond = { _id }
  } else if (slug && slug.length) {
    cond = { slug }
  }

  return await postModel
    .findOne(cond)
    .exec()
    .then(post => filterForumPost(JSON.parse(JSON.stringify(post))))
    .catch(error => {
      error
    })
}

export const findForumPosts = async ({ search = '', tags = [], sort = { createdAt: -1 } }) => {
  let cond = {}

  if (search && search.length) {
    cond = {
      $or: [{ title: { $regex: search, $options: 'ix' } }, { html: { $regex: search, $options: 'ix' } }]
    }
  }
  if (tags && tags.length) {
    if (cond != {}) {
      cond = { $and: [cond, { tags: { $in: tags } }] }
    } else {
      cond = { tags: { $in: tags } }
    }
  }

  console.log('forum/gql/findPosts', JSON.stringify(cond))

  return await postModel
    .find(cond)
    .sort(sort)
    .exec()
    .then(posts => {
      posts = JSON.parse(JSON.stringify(posts))
      console.log('forum/gql/findPosts posts', posts.map(p => p.slug))
      return posts.map(post => filterForumPostInList(post))
    })
    .catch(error => {
      error
    })
}
