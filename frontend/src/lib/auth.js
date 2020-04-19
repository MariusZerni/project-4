function setToken(token, userId) {
  localStorage.setItem('token', token)
  localStorage.setItem('userId', userId)
  
}

function isLoggedIn() {
  const isLoggedIn = !!localStorage.getItem('token')
  console.log('logged in' + isLoggedIn + ' ' + localStorage.getItem('token'))
  return isLoggedIn
}

function logout() {
  localStorage.removeItem('token')
}

function getToken() {
  return localStorage.getItem('token')
}

function getUserId() {
  return parseInt(localStorage.getItem('userId'))
}

// function getUserId() {
//   const token = getToken()
//   if (!token) return false
//   const parts = token.split('.')
//   return JSON.parse(atob(parts[1])).sub
// }

export default {
  setToken,
  isLoggedIn,
  logout,
  getToken,
  getUserId
}
