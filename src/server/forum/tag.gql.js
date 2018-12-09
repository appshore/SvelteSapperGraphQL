import formatRelative from 'date-fns/formatRelative'
import { enGB } from 'date-fns/locale'

import { tagModel } from '../../models/forumTag'


// Only the info that we want to send to the client
export const filterForumTag = tag => {
  return {
    _id: tag._id,
    name: tag.name,
    code: tag.code,
    timestamp: formatRelative(tag.createdAt, new Date(), { locale: enGB }),
    createdBy: tag.createdBy
  }
}

export const findForumTag = async (cond = {}) => {
  console.log('forum/gql/findTag', cond, JSON.stringify(cond), JSON.parse(cond))
  return await tagModel
    .findOne(JSON.parse(cond))
    .exec()
    .then(tag => filterForumTag(JSON.parse(JSON.stringify(tag))))
    .catch(error => {
      error
    })
}

export const findForumTags = async (cond = {}, sort = { createdAt: -1 }) => {
  console.log('forum/gql/findTags', cond)

  return await tagModel
    .find(cond)
    .sort(sort)
    .exec()
    .then(tags => {
      tags = JSON.parse(JSON.stringify(tags))
      console.log('forum/gql/findTags tags', tags)
      return tags.map(tag => filterForumTag(tag))
    })
    .catch(error => {
      error
    })
}
