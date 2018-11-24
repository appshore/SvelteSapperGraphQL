import { Store } from 'svelte/store'
import * as auth from './auth'
import * as ui from './ui'

class AppStore extends Store {
  periodicCheckAuth() {
    return auth.periodicCheckAuth(this)
  }

  checkAuth() {
    return auth.checkAuth(this)
  }

  listenerResize() {
    ui.listenerResize(this)
  }
}

export default AppStore
