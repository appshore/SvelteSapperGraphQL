import { tagModel } from '../../models/forumTag'
import { filterTagInList } from './tagFilter'

export const findTags = (req, res) => {
  tagModel
    .find()
    .sort({ name: 1 })
    .exec()
    .then(async tags => {
      tags = JSON.parse(JSON.stringify(tags))

      // add user info to each tag then filter it to remove unwanted fields
      return res.status(200).json({
        tags: tags.map(tag => filterTagInList(tag))
      })
    })
    .catch(error => {
      res.status(500).json({ error: error })
    })
}
