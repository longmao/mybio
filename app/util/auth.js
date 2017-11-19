/* globals localStorage */

export default {


  getToken () {
    return localStorage.getItem("userLogined")
  },
  setToken(token) {
    localStorage.setItem("userLogined",token) 
  },
  logout (cb) {
    localStorage.removeItem("userLogined")
    localStorage.removeItem("simplePass");
    localStorage.removeItem("expirePass");
    localStorage.removeItem("mtlLogin");
    if (cb) cb()
  },
  loggedIn () {
    return !!localStorage.getItem("userLogined")
  }

}
