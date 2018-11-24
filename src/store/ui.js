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
