import { gql } from 'apollo-server-express'

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  type ForumPostsPage {
    totalCount: Int
    pageCount: Int
    cursor: Int
    hasMore: Boolean
    forumPosts: [ForumPost]
  }

  type ForumPost {
    _id: String!
    slug: String
    title: String
    html: String
    timestamp: String
    createdBy: User
    tags: [ForumTag]
  }

  type ForumTag {
    code: String
    name: String
  }

  type User {
    _id: String!
    username: String
    email: String
    forumPosts: [ForumPost]
  }

  type Query {
    user(_id: String!): User

    users: [User]

    forumPost(_id: String, slug: String): ForumPost

    forumPostsPage(
      pageSize: Int,
      cursor: Int,
      search: String, 
      tags: [String]
    ): ForumPostsPage

    forumTag(code: String!): ForumTag

    forumTags: [ForumTag]
  }
`

export default typeDefs