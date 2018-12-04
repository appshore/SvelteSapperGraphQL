export const fetchPosts = async store => {
  let CFG = store.get().CFG

  try {
    let res = await fetch(`/${CFG.API_VERSION}/forum/posts`, {
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