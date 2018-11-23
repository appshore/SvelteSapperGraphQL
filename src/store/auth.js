import Cookie from 'js-cookie'

export const checkAuth = async store => {
  // console.log('store/auth/check')
  let CFG = store.get().CFG

  if (Boolean(Cookie.get('token')) === false) {
    store.set({
      isAuth: false,
      user: null,
    })
    return false
  }

  let res = await fetch(`/${CFG.API_VERSION}/auth/check`, {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => res.json())

  if (res.error || Boolean(res.token) === false ) {
    store.set({
      isAuth: false,
      user: null,
    })
    return false
  }
  
  Cookie.set('token', res.token, { path: '/', expires: CFG.COOKIE_TIMEOUT })

  store.set({
    isAuth: true,
    user: res.user,
  })
  return true
}

export const periodicCheckAuth = store => {
  let CFG = store.get().CFG

  setInterval(() => {
    checkAuth(store)
  }, CFG.AUTH_CHECK)
}

