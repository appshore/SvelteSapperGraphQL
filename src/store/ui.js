export const banner = (store, { html = '', level = '', duration = 3, dismiss = false}) => {
  let params = {}

  if (dismiss) {
    params = null
  } else if (Boolean(html)) {
    params = { html, level, duration, classes: getClasses(level) }

    if (duration) {
      setTimeout(() => {
        banner(store, { dismiss: true })
      }, duration * 1000)
    }
  }

  store.set({ banner : params})
}

export const toast = (store, { html = '', level, duration = 3, dismiss = null }) => {
  let toasts = store.get().toasts || []

  if (dismiss !== null) {
    toasts = store.get().toasts.filter(toast => toast.id != dismiss)
  } else {
    let id = Math.random(1, 100) * Date.now()
    toasts.push({ id, html, level, duration, classes: getClasses(level) })

    if (duration) {
      setTimeout(() => {
        toast(store, { dismiss: id })
      }, duration * 1000)
    }
  }

  store.set({ toasts })
}

const getClasses = (level = 'i') => {
  let classes

  switch (level[0]) {
    case 'd': // danger
      classes = 'w3-red w3-text-white'
      break
    case 's': //success
      classes = 'w3-teal w3-text-white'
      break
    case 'w': // warning
      classes = 'w3-orange w3-text-black'
      break
    case 'i': //info
    default :
      classes = 'w3-blue w3-text-white'
      break
  }

  return classes
}

export const listenerResize = store => {
  let CFG = store.get().CFG

  const resizeHandler = () => {
    let isMobile = window.matchMedia(`(max-width: ${CFG.MOBILE_WIDTH})`).matches
    if (store.get().isMobile != isMobile) {
      store.set({
        isMobile
      })
    }

    store.set({
      isResize: Date.now()
    })
  }

  let resizeTimeout
  const resizeThrottler = () => {
    // ignore resize events as long as an resizeHandler execution is in the queue
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(() => {
        resizeTimeout = null
        resizeHandler()
        // 66 The resizeHandler will execute at a rate of 15fps
      }, 66)
    }
  }

  window.addEventListener('resize', resizeThrottler, false)

  resizeHandler()
}
