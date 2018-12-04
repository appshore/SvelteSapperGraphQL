import formatRelative from 'date-fns/formatRelative'
import { enGB } from 'date-fns/locale'

// Only the info that we want to send to the client
export const filterTagInList = tag => {
  return {
    name: tag.name,
    code: tag.code
  }
}

// Only the info that we want to send to the client
export const filterTag = (tag, user) => {
  return {
    name: tag.name,
    code: tag.code,
    timestamp: formatRelative(tag.createdAt, new Date(), { locale: enGB }),
    createdBy: user._id,
    username: user.username,
  }
}
