/* eslint-disable no-undef,no-underscore-dangle */

class AccessControl {
  constructor() {
    this.loginUri = './api/login';
    this.accessTokenKeyName = 'alchemy-access-token';
    this.userKeyName = 'alchemy-user';

    this.currentUser = null;
    this.accessToken = null;
  }

  login(username, password, successCallback, failCallback) {
    if (!username || !password) {
      const errorMessage = 'Please enter username and password.';
      failCallback(errorMessage);
      throw new Error(errorMessage);
    }
    if (this.currentUser && this.accessToken) { throw new Error('User is already logged in.'); }
    alchemyCommon.loadingBar.queue();
    const that = this;
    this._attemptLogin(username, password)
      .then(fetchStatus)
      .then(response => response.json())
      .then((data) => { that.onLogin(data); })
      .then(successCallback || Logger.success)
      .catch(e => handleResponse(e, failCallback || Logger.error));
  }

  logout() {
    this._onLogout();
  }

  browserHasSession() {
    return this.getAccessToken();
  }

  getAccessToken() {
    if (!this.accessToken) {
      this.accessToken = localStorage.getItem(this.accessTokenKeyName);
    }
    return this.accessToken;
  }

  getUser() {
    if (!this.currentUser) {
      this.currentUser = localStorage.getItem(this.userKeyName);
    }
    return this.currentUser;
  }

  storeSession(accessToken, user) {
    localStorage.setItem(this.accessTokenKeyName, accessToken);
    localStorage.setItem(this.userKeyName, user);
    this.accessToken = accessToken;
    this.currentUser = user;
  }

  clearSession() {
    localStorage.removeItem(this.accessTokenKeyName);
    localStorage.removeItem(this.userKeyName);
    this.accessToken = null;
    this.currentUser = null;
  }

  _attemptLogin(username, password) {
    const body = new FormData();
    body.append('username', username);
    body.append('password', password);

    const params = {
      method: 'POST',
      body
    };

    return fetch(this.loginUri, params);
  }

  onLogin(data) {
    // eslint-disable-next-line camelcase
    const { access_token: accessToken, user } = data;
    if (accessToken === null) throw new Error(data, ' doesn\'t contain access token.');
    if (user === null) throw new Error(data, ' doesn\'t contain user.');
    this.storeSession(accessToken, user);
  }

  _onLogout() {
    this.clearSession();
  }
}

window.accessControl = new AccessControl();
