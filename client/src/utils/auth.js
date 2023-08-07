// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
  // get user data from JSON web token by decoding it
  getProfile() {
    return decode(this.getToken());
  }

  // return `true` or `false` if token exists (does not verify if it's expired yet)
  loggedIn() {
    const token = this.getToken();
    return token ? true : false;
  }

  getToken() {
    // Retrieves the user token from localStorage
    return JSON.parse(localStorage.getItem('DD_session')).token;
  }

  login(userInfo) {
    // Saves user and token to localStorage and reloads the application for logged in status to take effect
    const DD_session = userInfo;
    localStorage.setItem('DD_session', JSON.stringify(DD_session));
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('DD_session');
    // this will reload the page and reset the state of the application
    window.location.reload();
  }
}

export default new AuthService();
