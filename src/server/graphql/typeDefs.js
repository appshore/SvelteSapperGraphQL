import { gql } from 'apollo-server-express'

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
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
    _id: String!
    code: String
    name: String
  }

  type User {
    _id: String!
    username: String
    email: String
    forumPosts: [ForumPost]
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    user(_id: String!): User
    users: [User]
    forumPost(_id: String!): ForumPost
    forumPostBySlug(cond: String!): ForumPost
    forumPosts: [ForumPost]
    forumTag(code: String!): ForumTag
    forumTags(cond: String): [ForumTag]
  }
`

export default typeDefs