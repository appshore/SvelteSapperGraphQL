import * as sapper from '../__sapper__/client'

import AppStore from './store'
import settings from './settings'

console.log( settings)

sapper.start({
  target: document.querySelector('#sapper'),
  store: () => new AppStore({settings})
})

// Materialize init is done component by component instead of globally
// document.addEventListener('DOMContentLoaded', () => {
//   typeof M !== 'undefined' && M.AutoInit()
// })
