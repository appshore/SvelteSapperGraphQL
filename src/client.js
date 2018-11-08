import * as sapper from '../__sapper__/client'

import AppStore from './store'
import CFG from './config'

let store = new AppStore({
  CFG
})

store.periodicCheckAuth()

sapper.start({
  target: document.querySelector('#sapper'),
  store: () => store
})
