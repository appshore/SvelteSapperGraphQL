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

  banner(params) {
    ui.banner(this, params)
  }

  toast(params) {
    ui.toast(this, params)
  }

  listenerResize() {
    ui.listenerResize(this)
  }
}

export default AppStore
