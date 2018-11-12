export const banner = (store, params) => {
  if (Boolean(params) === false) {
    store.set({ banner: null })
    return
  }
  let { html, level, duration } = params
  store.set({
    banner: { html, level, duration, classes: getClasses(level) },
  })

  if (duration) {
    setTimeout(() => {
      store.set({ banner: null })
    }, duration * 1000)
  }
}

export const toast = (store, params) => {
  let { html, level } = params
  // M.toast({ html, classes: getClasses(level) })
}

const getClasses = (level = 'd') => {
  let classes = 'w3-teal w3-text-white' // default

  switch (level[0]) {
    case 'e': // error
      classes = 'w3-red w3-text-white'
      break
    case 'i': //info
      classes = 'w3-blue w3-text-white'
      break
    case 'w': // warning
      classes = 'w3-orange w3-text-black'
      break
  }

  return classes
}

export const listenerResize = store => {
  let CFG = store.get().CFG

  const resize = () =>
    store.set({
      isMobile: window.matchMedia(`(max-width: ${CFG.MOBILE_WIDTH})`).matches,
    })

  resize()
  window.addEventListener('resize', () => {
    resize()
  })
}
