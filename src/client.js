import * as sapper from '../__sapper__/client'

import AppStore from './store/client'

// we check for auth before running sapper
// this allow to start potentially with an authentified user
// bit slower but better user experience
AppStore.checkAuth().then(() => {
  sapper.start({
    target: document.querySelector('#sapper'),
    store: () => AppStore,
  })
})

// run some event handlers
AppStore.periodicCheckAuth()
AppStore.listenerResize()
