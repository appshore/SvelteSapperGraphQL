import { firebase } from '@firebase/app'
import '@firebase/auth'

export const login = async (store, credentials) => {
  console.log('store/auth/login', credentials, firebase)

  try {
    let logIn = await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)

    let { displayName, email, photoURL, emailVerified, uid } = firebase.auth().currentUser
    store.set({
      isAuth: Boolean(logIn),
      user: {
        displayName,
        email,
        photoURL,
        emailVerified,
        uid,
      },
    })
    console.log('store/auth/login signin', store.get())
  } catch (error) {
    store.set({
      isAuth: false,
      user: null,
    })
    console.log('store/auth/login error ', error)
  }
  return true
}

export const logout = async (store) => {
  try {
    await firebase.auth().signOut()

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
  console.log('store/auth/signup', user, firebase)

  try {
    await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)

    await firebase.auth().currentUser.updateProfile({
      displayName: `${user.displayName}`,
      // photoURL: 'https://example.com/jane-q-user/profile.jpg'
    })

    await firebase.auth().currentUser.sendEmailVerification()

    let { displayName, email, photoURL, emailVerified, uid } = firebase.auth().currentUser
    store.set({
      isAuth: Boolean(email),
      user: {
        displayName,
        email,
        photoURL,
        emailVerified,
        uid,
      },
    })
  } catch (error) {
    console.log('store/auth/signup error ', error)
  }

  console.log('store/auth/signup signup', store.get())

  return true
}
