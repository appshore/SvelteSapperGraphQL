export const fetchPosts = async (store, {search, tags}) => {
  let CFG = store.get().CFG

  tags = getSelectedTags(tags||[])
  console.log('selected tags', tags)

  try {
    let res = await fetch(`/${CFG.API_VERSION}/forum/posts?search=${search}${tags}`, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    if (res.error) {
      throw res.error
    }
    return res.posts
  } catch (err) {
    return []
  }
}

const getSelectedTags = tags => {
  let selected = ''
  tags.forEach(t => {
      selected += `&tags[]=${t}`
  })
  return selected
}