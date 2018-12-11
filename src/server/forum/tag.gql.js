// import formatRelative from 'date-fns/formatRelative'
// import { enGB } from 'date-fns/locale'

import { tagModel } from '../../models/forumTag'

// Only the info that we want to send to the client
export const filterForumTag = tag => {
  return {
    // _id: tag._id,
    name: tag.name,
    code: tag.code
    // timestamp: formatRelative(tag.createdAt, new Date(), { locale: enGB }),
    // createdBy: tag.createdBy
  }
}

export const findForumTag = async ({ code = '' }) => {
  let cond = {}
  if (code && code.length) {
    cond = { code }
  }
  return await tagModel
    .findOne(cond)
    .exec()
    .then(tag => JSON.parse(JSON.stringify(tag)))
    .then(tag => filterForumTag(tag))
    .catch(error => error)
}

export const findForumTags = async ({ tags = [], sort = { createdAt: -1 } }) => {
  let cond = {}
  if (tags && tags.length) {
    cond = { code: { $in: tags } }
  }
  return await tagModel
    .find(cond)
    .sort(sort)
    .exec()
    .then(tags => JSON.parse(JSON.stringify(tags)))
    .then(tags => tags.map(tag => filterForumTag(tag)))
    .catch(error => error)
}
