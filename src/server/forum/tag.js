import mongoose from 'mongoose'

import { tagModel } from '../../models/forumTag'
import { filterTag } from './tagFilter'
import { findUsersByIds } from '../user/users'

export const deleteTag = (req, res) => {
  tagModel
    .deleteOne({ code: req.params.code })
    .exec()
    .then(() => {
      return res.status(200).json({
        tag: null
      })
    })
    .catch(error => {
      return res.status(500).json({
        error: error
      })
    })
}

export const findTag = (req, res) => {
  tagModel
    .findOne({ code: req.params.code })
    .exec()
    .then(async result => {
      result = JSON.parse(JSON.stringify(result))

      // retrieve the user whom authored a tag
      let [user] = await findUsersByIds([result.createdBy])

      // add user info to each tag then filter it to remove unwanted fields
      return res.status(200).json({
        tag: filterTag(result, user)
      })
    })
    .catch(error => {
      return res.status(500).json({
        error: error
      })
    })
}

export const saveTag = async (req, res) => {
  let tag = new tagModel({
    _id: new mongoose.Types.ObjectId(),
    code: req.body.code,
    name: req.body.name,
    createdAt: new Date(),
    createdBy: req.user._id
  })

  tag
    .save()
    .then(async result => {
      result = JSON.parse(JSON.stringify(result))

      // retrieve the user whom authored a tag
      let [user] = await findUsersByIds([result.createdBy])

      return res.status(200).json({
        tag: filterTag(result, user)
      })
    })
    .catch(error => {
      return res.status(500).json({
        error
      })
    })
}

export const updateTag = async (req, res, next) => {
  let dataSet = {
    code: req.body.code,
    name: req.body.name,
    updatedAt: new Date(),
    updatedBy: req.user._id
  }

  // check that name and code are not already taken
  let checkTag = await tagModel
  .findOne({ code: dataSet.code }, { code: 1, name: 1 })
  .exec()
  .then(result => JSON.parse(JSON.stringify(result)))

  if( checkTag && checkTag.code === dataSet.code && req.body.code !== dataSet.code ) {
    return res.status(200).json({
      error: 'Code already in use'
    })
  }

  tagModel
    .updateOne({ code: req.params.code }, { $set: dataSet })
    .then( async () => {
      req.params.code = dataSet.code // in case name has been modified
      return await findTag(req, res, next)
    })
    .catch(error => {
      return res.status(500).json({
        error
      })
    })
}
