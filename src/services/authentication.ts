export function getUserToken() {
  return localStorage.getItem('token') ?? sessionStorage.getItem('token');
}
