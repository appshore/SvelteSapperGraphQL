import { findPost, findPosts } from '../forum/gql'
import { findUser, findUsers } from '../user/gql'

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
  Query: {
    user: (_, { _id }) => findUser({ _id : _id }),
    users: () => findUsers(),
    forumPost: (_, { _id }) => findPost({_id}),
    forumPostBySlug: (_, { cond }) => findPost(cond),
    forumPosts: () => findPosts(),
  },

  User: {
    forumPosts: user => findPosts({ createdBy: user._id }),
  },

  ForumPost: {
    createdBy: forumPost => findUser({ _id: forumPost.createdBy })
  }
}

export default resolvers
