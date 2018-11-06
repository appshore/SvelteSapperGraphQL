export const login = async (store, credentials) => {
  let firebase = window.firebase

  console.log('store/auth/login', credentials, firebase)

  try {
    let logIn = await firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)

    let { displayName, email, photoURL, emailVerified, uid } = firebase.auth().currentUser
    store.set({
      isAuth: Boolean(logIn),
      user: {
        displayName,
        email,
        photoURL,
        emailVerified,
        uid
      }
    })
    console.log('store/auth/login signin', store.get())
  } catch (error) {
    store.set({
      isAuth: false,
      user: null
    })
    console.log('store/auth/login error ', error)
  }
  return true
}

export const logout = async store => {
  let firebase = window.firebase

  let logOut = await firebase
    .auth()
    .signOut()
    .catch(error => {
      console.error('store/auth/logout error ', error)
    })

  store.set({
    isAuth: false,
    user: null
  })
  // console.log('store/auth/logout signout', store.get())
  return true
}

export const resetpassword = async (store, email) => {
  let firebase = window.firebase

  console.log('store/auth/resetpassword', email)
}

export const signup = async (store, user) => {
  let firebase = window.firebase

  console.log('store/auth/signup', user, firebase)

  try {
    await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)

    await firebase.auth().currentUser.updateProfile({
      displayName: `${user.displayName}`
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
        uid
      }
    })
  } catch (error) {
    console.log('store/auth/signup error ', error)
  }

  console.log('store/auth/signup signup', store.get())

  return true
}
