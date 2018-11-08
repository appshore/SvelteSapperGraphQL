import Cookie from 'js-cookie'

import CFG from '../config'

export const checkAuth = async store => {
  // console.log('store/auth/check')

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

  if (res.error) {
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
  // console.log('store/auth/check auth', store.get())
  return true
}

export const periodicCheckAuth = store => {
  setInterval(() => {
    checkAuth(store)
  }, CFG.AUTH_CHECK)
}

export const login = async (store, credentials) => {
  console.log('store/auth/login', credentials)

  try {
    let res = await fetch(`/${CFG.API_VERSION}/auth/login`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }).then(res => res.json())

    if (res.error) {
      throw res.error
    }
    Cookie.set('token', res.token, { path: '/', maxAge: CFG.COOKIE_TIMEOUT })

    store.set({
      isAuth: true,
      user: res.user,
    })
    console.log('store/auth/login loggedIn', res.user, store.get())
    return true
  } catch (error) {
    store.set({
      isAuth: false,
      user: null,
    })
    console.log('store/auth/login error ', error)
    return false
  }
}

export const logout = async store => {
  try {
    await fetch(`/${CFG.API_VERSION}/auth/logout`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())

    Cookie.remove('token', { path: '/' })

    store.set({
      isAuth: false,
      user: null,
    })
  } catch (error) {
    console.log('store/auth/logout error ', error)
  }
  return true
}

export const resetpassword = async (store, email) => {
  console.log('store/auth/resetpassword', email)
}

export const signup = async (store, user) => {
  console.log('store/auth/signup', user)

  try {
    let res = await fetch(`/${CFG.API_VERSION}/auth/signup`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then(res => res.json())

    if (res.error) {
      throw res.error
    }
    // console.log('signup afterSubmit', 'success', res, this.state, this.props)
    Cookie.set('token', res.token, { path: '/', maxAge: CFG.COOKIE_TIMEOUT })

    store.set({
      isAuth: true,
      user: res.user,
    })
  } catch (error) {
    console.log('store/auth/signup error ', error)
  }

  console.log('store/auth/signup signup', store.get())

  return true
}
