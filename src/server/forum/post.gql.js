import formatRelative from 'date-fns/formatRelative'
import { enGB } from 'date-fns/locale'
import htmlToText from 'html-to-text'

import { postModel } from '../../models/forumPost'

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
    // .then(post => JSON.parse(JSON.stringify(post)))
    .then(post => filterForumPost(post))
    .catch(error => error)
}

export const findForumPosts = async ({ pageSize = 20, pageIdx = 0, search = '', tags = [], sort = { createdAt: -1 } }) => {
  let cond = {}
  let cursor = pageSize * pageIdx

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

  console.log('findForumPosts', 'pageSize', pageSize, 'pageIdx', pageIdx, 'cond', cond)

  return await postModel
    .find(cond)
    .sort(sort)
    .skip(cursor)
    .exec()
    // .then(posts => JSON.parse(JSON.stringify(posts)))
    .then(async posts => {
      let count = await postModel.where(cond).countDocuments()
      return {
        count,
        cursor: cursor,
        hasMore: cursor < count,
        forumPosts: posts.map(post => filterForumPostInList(post))
      }
    })
    .catch(error => error)
}
