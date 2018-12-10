import gql from 'graphql-tag'

const forumPosts = `forumPosts(search: $search, tags: $tags)  {
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
`

const forumTags = `forumTags {
  code
  name
}
`

export const FORUM_POSTS = gql`
  query forumPosts($search: String = "", $tags: [String] = []){
    ${forumPosts}
  }
`

export const FORUM_TAGS = gql`
  query {
    ${forumTags}
  }
`

export const FORUM_POSTS_AND_TAGS = gql`
  query forumPostsAndTags($search: String = "", $tags: [String] = []) {
    ${forumPosts}
    ${forumTags}
  }
`
