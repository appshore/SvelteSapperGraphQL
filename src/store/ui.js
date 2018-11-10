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
  let { html, level} = params
  M.toast({ html, classes: getClasses(level) })
}

const getClasses = (level = 'd') => {
  let classes = 'teal lighten-2 white-text' // default

  switch (level[0]) {
    case 'e': // error
      classes = 'red white-text'
      break
    case 'i': //info
      classes = ' blue lighten-2 white-text'
      break
    case 'w': // warning
      classes = 'orange black-text'
      break
  }

  return classes
}
