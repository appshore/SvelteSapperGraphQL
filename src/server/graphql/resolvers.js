import { findForumPost, findForumPosts } from '../forum/post.gql'
import { findForumTag, findForumTags } from '../forum/tag.gql'
import { findUser, findUsers } from '../user/gql'

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    user: (_, { _id }) => findUser({ _id: _id }),
    users: () => findUsers(),
    forumPost: (_, { _id, slug }) => findForumPost({ _id, slug }),
    forumPosts: (_, { search, tags }) => findForumPosts({ search, tags }),
    forumTag: (_, { code }) => findForumTag({ code }),
    forumTags: () => findForumTags({})
  },

  User: {
    forumPosts: user => findForumPosts({ createdBy: user._id })
  },

  ForumPost: {
    createdBy: forumPost => findUser({ _id: forumPost.createdBy }),
    tags: forumPost => forumPost.tags.length ? findForumTags({ tags: forumPost.tags }) : []
  }
}

export default resolvers
