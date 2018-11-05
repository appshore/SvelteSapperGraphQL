import { post } from '../lib/fetch'

export const login = async (store, credentials) => {
  console.log('store/auth/login', credentials)

  return await post('auth/login', credentials).then(res => {
    if (res.user) {
      store.set({
        isAuth: true,
        user: res.user
      })
    }
    return res
  })
}

export const logout = async store => {
  console.log('store/auth/logout')

  return await post('auth/logout').then(res => {
    store.set({
      isAuth: false,
      user: null
    })
    return res
  })
}

export const resetpassword = async (store, email) => {
  console.log('store/auth/resetpassword', email)

  return await post('auth/resetpassword', email).then(res => {
    if (res.user) {
      store.set({
        isAuth: false,
        user: null
      })
    }
    return res
  })
}

export const signup = async (store, user) => {
  console.log('store/auth/signup', user)

  return await post('auth/signup', user).then(res => {
    if (res.user) {
      store.set({
        isAuth: true,
        user: res.user
      })
    }
    return res
  })
}
