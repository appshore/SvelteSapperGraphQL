import { Store } from 'svelte/store'
import * as auth from './auth'

class AppStore extends Store {
  periodicCheckAuth() {
    return auth.periodicCheckAuth(this)
  }

  checkAuth() {
    return auth.checkAuth(this)
  }

  login(credentials) {
    return auth.login(this, credentials)
  }

  logout() {
    return auth.logout(this)
  }

  signup(user) {
    return auth.signup(this, user)
  }
}

export default AppStore
