import * as sapper from '../__sapper__/client'

import AppStore from './store'
import CFG from './config'

let store = new AppStore({
  CFG,
  isMobile:true,
  isResize: new Date()
})

// we check for auth before running sapper
// this allow to start potentially with an authentified user
// bit slower but better user experience
store.checkAuth().then(() => {
  sapper.start({
    target: document.querySelector('#sapper'),
    store: () => store,
  })
})

// run some event handlers
store.periodicCheckAuth()
store.listenerResize()
