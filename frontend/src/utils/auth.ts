export function saveTokens(access: string, refresh: string) {
  localStorage.setItem('access', access)
  localStorage.setItem('refresh', refresh)
}

export function getAccessToken() {
  return localStorage.getItem('access')
}

export function getRefreshToken() {
  return localStorage.getItem('refresh')
}

export function isAuthenticated() {
  return Boolean(getAccessToken())
}

export function logout() {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  localStorage.removeItem('user')
}