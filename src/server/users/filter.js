// Add extra info to the user profile
export const extendProfile = user => {
  user.fullName = user.firstName + ' ' + user.lastName
  return user
}

// Only the info that we want to send to the client
export const filterProfile = (user) => {
  // console.log('filterProfile', user)
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    dateOfBirth: user.dateOfBirth,
    role: user.role,
  }
}

// Only the info that we want to send to the client
export const filterPrefs = user => {
  // console.log('filterPrefs', user._id)
  return {
    // _id: user._id,
    // firstName: user.firstName,
    // lastName: user.lastName,
    username: user.username,
    email: user.email,
  }
}
