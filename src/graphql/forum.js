import gql from 'graphql-tag'

export const FORUM_POSTS = gql`
  query {
    forumPosts {
      slug
      title
      html
      timestamp
      createdBy {
        username
      }
      tags {
        code
        name
      }
    }
  }
`

export const FORUM_TAGS = gql`
  query {
    forumTags {
      code
      name
    }
  }
`
