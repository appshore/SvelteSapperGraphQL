import * as sapper from '../__sapper__/client'

import {initFirebase} from './firebase'
import AppStore from './store'
import CFG from './config'

let store = new AppStore({
  CFG
})

initFirebase(store)

sapper.start({
  target: document.querySelector('#sapper'),
  store: () => store
})
