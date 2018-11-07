import { firebase } from '@firebase/app'
import '@firebase/auth'
import '@firebase/firestore'

const setUserState = (store, user) => {
  if (user) {
    let { displayName, email, photoURL, emailVerified, uid } = user
    store.set({
      isAuth: true,
      user: {
        displayName,
        email,
        photoURL,
        emailVerified,
        uid,
      },
    })
  } else {
    store.set({
      isAuth: false,
      user: null,
    })
  }
}

export const initFirebase = async (store) => {
  console.log('firebase/initFirebase', store)

  await firebase.initializeApp({
    apiKey: 'AIzaSyAtg3ZVuLGHBud7tZADrUt0O2Ln-4ZqKCA',
    authDomain: 'sapeur-by-appshore.firebaseapp.com',
    databaseURL: 'https://sapeur-by-appshore.firebaseio.com',
    projectId: 'sapeur-by-appshore',
    storageBucket: 'sapeur-by-appshore.appspot.com',
    messagingSenderId: '578965121739',
  })

  // Initialize Cloud Firestore through Firebase
  let firestore = firebase.firestore()

  // Disable deprecated features
  firestore.settings({
    timestampsInSnapshots: true,
  })

  store.set({
    firestore,
  })

  // set user if auth
  setUserState(store, firebase.auth().currentUser)

  // event handler on firebase auth state
  await firebase.auth().onAuthStateChanged((user) => {
    console.log('client onAuthStateChanged', user)
    setUserState(store, user)
  })
}
