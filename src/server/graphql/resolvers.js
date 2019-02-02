import { findForumPost, findForumPosts } from '../forum/post.gql'
import { findForumTag, findForumTags } from '../forum/tag.gql'
import { findUser, findUsers } from '../user/gql'

const resolvers = {
  Query: {
    user: (_, { _id }) => findUser({ _id }),
    users: () => findUsers(),
    forumPost: (_, { _id, slug }) => findForumPost({ _id, slug }),
    forumPostsPage: (_, { pageSize, cursor, search, tags }) => findForumPosts({ pageSize, cursor, search, tags }),
    forumTag: (_, { code }) => findForumTag({ code }),
    forumTags: () => findForumTags({})
  },

  User: {
    forumPosts: user => findForumPosts({ createdBy: user._id })
  },

  ForumPost: {
    createdBy: forumPost => findUser({ _id: forumPost.createdBy }),
    tags: ({ tags }) => (tags.length ? findForumTags({ tags }) : [])
  }
}

export default resolvers
