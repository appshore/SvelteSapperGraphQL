import { firebase } from '@firebase/app'
import '@firebase/auth'

import * as sapper from '../__sapper__/client'

import AppStore from './store'
import CFG from './config'

firebase.initializeApp({
  apiKey: 'AIzaSyAtg3ZVuLGHBud7tZADrUt0O2Ln-4ZqKCA',
  authDomain: 'sapeur-by-appshore.firebaseapp.com',
  databaseURL: 'https://sapeur-by-appshore.firebaseio.com',
  projectId: 'sapeur-by-appshore',
  storageBucket: 'sapeur-by-appshore.appspot.com',
  messagingSenderId: '578965121739'
})

let user = null
window.firebase = firebase
if (firebase.auth().currentUser) {
  let { displayName, email, photoURL, emailVerified, uid } = firebase.auth().currentUser
  user = { displayName, email, photoURL, emailVerified, uid }
  console.log('client user', user)
} else {
  console.log('client user', user)
}

let store = new AppStore({
  CFG,
  isAuth: Boolean(user),
  user
})

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('client onAuthStateChanged', user)

    let { displayName, email, photoURL, emailVerified, uid } = firebase.auth().currentUser
    store.set({
      isAuth: true,
      user: {
        displayName,
        email,
        photoURL,
        emailVerified,
        uid
      }
    })
  } else {
    store.set({
      isAuth: false,
      user: null
    })
  }
})

sapper.start({
  target: document.querySelector('#sapper'),
  store: () => store
})

// Materialize init is done component by component instead of globally
// document.addEventListener('DOMContentLoaded', () => {
//   typeof M !== 'undefined' && M.AutoInit()
// })
