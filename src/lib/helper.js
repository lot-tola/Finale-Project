import { ref } from 'vue'
import { jwtDecode } from 'jwt-decode'
export const token = ref(null || localStorage.getItem('jwt'))

export function getUserRole() {
  if (token.value === null) {
    return ''
  }
  const { role } = jwtDecode(token.value)
  return role
}

export function getUserName() {
  if (!token.value) return
  const { username } = jwtDecode(token.value)
  if (!username) return
  return username
}

export function setToken(newToken) {
  token.value = newToken
  localStorage.setItem('jwt', newToken)
}

export function isAuthenticate() {
  return token.value !== null
}

export function checkExpired() {
  if (!token.value) {
    return true
  }
  const decoded = jwtDecode(token.value)
  let delta = Date.now() - decoded.exp * 1000
  if (delta >= 0) {
    localStorage.removeItem('jwt')
    return true
  }
  return false
}

export function logout() {
  localStorage.removeItem('jwt')
}
