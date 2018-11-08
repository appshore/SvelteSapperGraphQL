const alert = (html, level = 'd') => {
  let classes = 'teal white-text' // default

  switch (level[0]) {
    case 'e': // error
      classes = 'red white-text'
      break
    case 'i': //info
      classes = 'cyan white-text'
      break
    case 'w': // warning
      classes = 'orange black-text'
      break
    default:
      break
  }

  M.toast({ html, classes: classes })
}

export default alert
