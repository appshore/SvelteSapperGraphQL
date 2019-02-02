import Cookie from 'js-cookie'

export const login = async (store, credentials) => {
  let CFG = store.get().CFG

  try {
    let res = await fetch(`/${CFG.API_VERSION}/auth/login`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(res => res.json())

    if (res.error) {
      throw res.error
    }

    if (Boolean(res.user) === false) {
      throw 'Unknown profile'
    }

    Cookie.set('token', res.token, { path: '/', expires: CFG.COOKIE_TIMEOUT })

    store.set({
      isAuth: true,
      user: res.user
    })
    return {
      status: true
    }
  } catch (error) {
    store.set({
      isAuth: false,
      user: null
    })
    return {
      status: false,
      msg: error
    }
  }
}

export const logout = async store => {
  let CFG = store.get().CFG

  try {
    await fetch(`/${CFG.API_VERSION}/auth/logout`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())

    Cookie.remove('token', { path: '/' })

    store.set({
      isAuth: false,
      user: null
    })
    return {
      status: true
    }
  } catch (error) {
    return {
      status: false,
      msg: error
    }
  }
}

export const signup = async (store, user) => {
  let CFG = store.get().CFG

  try {
    let res = await fetch(`/${CFG.API_VERSION}/user/signup`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(res => res.json())

    if (res.error) {
      throw res.error
    }

    if (Boolean(res.user) === false) {
      throw 'Unknown profile'
    }

    Cookie.set('token', res.token, { path: '/', expires: CFG.COOKIE_TIMEOUT })

    store.set({
      isAuth: true,
      user: res.user
    })
    return {
      status: true
    }
  } catch (error) {
    return {
      status: false,
      msg: error
    }
  }
}
