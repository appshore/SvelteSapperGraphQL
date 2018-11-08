import Cookie from 'js-cookie'

import CFG from '../config'

const check = async store => {
  console.log('store/auth/check')

  try {
    if (Boolean(Cookie.get('token')) === false) {
      throw 'no token'
    }

    let res = await fetch('auth/check', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())

    if (res.error) {
      throw res.error
    }
    Cookie.set('token', res.token, { path: '/', expires: CFG.COOKIE_TIMEOUT })

    store.set({
      isAuth: true,
      user: res.user,
    })
    console.log('store/auth/check auth', store.get())
    return true
  } catch (error) {
    store.set({
      isAuth: false,
      user: null,
    })
    console.log('store/auth/check error ', error)
    return false
  }
}

export const periodicCheckAuth = store => {
  check(store)
  setInterval(() => {
    check(store)
  }, CFG.AUTH_CHECK)
}

export const login = async (store, credentials) => {
  console.log('store/auth/login', credentials)

  try {
    let res = await fetch('login', {
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
    await fetch('logout', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => res.json())

    Cookie.remove('token', { path: '/'})

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
    let res = await fetch('signup', {
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
