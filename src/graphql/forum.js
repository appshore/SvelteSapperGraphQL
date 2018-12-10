import gql from 'graphql-tag'

const forumPostsPage = `forumPostsPage(pageSize: $pageSize, pageIdx: $pageIdx, search: $search, tags: $tags)  {
  count
  cursor
  hasMore
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

const forumTags = `forumTags {
  code
  name
}
`

export const FORUM_POSTS_PAGE = gql`
  query forumPostsPage($pageSize:Int = 20, $pageIdx: Int = 0, $search: String = "", $tags: [String] = []){
    ${forumPostsPage}
  }
`

export const FORUM_TAGS = gql`
  query {
    ${forumTags}
  }
`

export const FORUM_POSTS_AND_TAGS_PAGE = gql`
  query forumPostsAndTagsPage($pageSize:Int = 20, $pageIdx: Int = 0, $search: String = "", $tags: [String] = []) {
    ${forumPostsPage}
    ${forumTags}
  }
`
