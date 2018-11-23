
export const updatePrefs = async (store, user) => {
  let CFG = store.get().CFG

  try {
    let res = await fetch(`/${CFG.API_VERSION}/user/prefs`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then(res => res.json())

    if (res.error) {
      throw res.error
    }
    store.set({
      user: res.user,
    })
    return {
      status: true
    }
  } catch (error) {
    return {
      status: false,
      msg: error
    }
  }
}
