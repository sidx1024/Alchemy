/* eslint-disable no-undef,no-unused-vars */

/*
|--------------------------------------------------------------------------
| Model
|--------------------------------------------------------------------------
|
| A base class for all models (Course, Faculty, Department)
| Implements generic CRUD operations with the Database via REST API
| Uses methods implemented here unless overridden in derived class
|
*/

class Model {
  constructor(modelName, config) {
    this.config = config;
    this.modelName = modelName;
    this.uri = `${this.config.api.path}/${modelName.toLowerCase()}/`;
    this.actions = {
      all: { path: `${this.uri}all`, method: 'GET', verb: 'getting all' },
      get: { path: `${this.uri}get/{id}`, method: 'GET', verb: 'getting' },
      add: { path: `${this.uri}add`, method: 'POST', verb: 'adding' },
      update: { path: `${this.uri}update/{id}`, method: 'PUT', verb: 'modifying' },
      delete: { path: `${this.uri}delete/{id}`, method: 'DELETE', verb: 'deleting' },
      search: { path: `${this.uri}search?`, method: 'GET', verb: 'searching' }
    };
    this.headers = this.config.api.headers;
  }

  all(successCallback, failCallback) {
    const action = this.actions.all;
    const url = action.path;

    const params = {
      method: action.method,
      headers: this.headers
    };

    return fetch(url, params)
      .then(fetchStatus)
      .then(response => response.json())
      .then(successCallback || Logger.success)
      .catch(e => (failCallback || this.statusFailure(action.verb))(e));
  }

  get(id = 1, successCallback, failCallback) {
    const action = this.actions.get;
    const url = action.path.replace('{id}', id.toString());

    const params = {
      method: action.method,
      headers: this.headers
    };

    return fetch(url, params)
      .then(fetchStatus)
      .then(response => response.json())
      .then(successCallback || Logger.success)
      .catch(e => (failCallback || this.statusFailure(action.verb, id))(e));
  }

  add(object, successCallback, failCallback) {
    const action = this.actions.add;
    const url = action.path;

    const params = {
      method: action.method,
      headers: this.headers,
      body: object
    };

    return fetch(url, params)
      .then(fetchStatus)
      .then(response => response.json())
      .then(successCallback || Logger.success)
      .catch(e => (failCallback || this.statusFailure(action.verb))(e));
  }

  update(id, object, successCallback, failCallback) {
    const action = this.actions.update;
    const url = action.path.replace('{id}', id.toString());

    const params = {
      method: action.method,
      headers: this.headers,
      body: object
    };

    return fetch(url, params)
      .then(fetchStatus)
      .then(response => response.json())
      .then(successCallback || Logger.success)
      .catch(e => (failCallback || this.statusFailure(action.verb))(e));
  }

  delete(id = 1, successCallback, failCallback) {
    const action = this.actions.delete;
    const url = action.path.replace('{id}', id.toString());

    const params = {
      method: action.method,
      headers: this.headers
    };

    return fetch(url, params)
      .then(fetchStatus)
      .then(response => response.json())
      .then(successCallback || Logger.success)
      .catch(e => (failCallback || this.statusFailure(action.verb, id))(e));
  }

  search(parametrizedUrl, successCallback, failCallback) {
    const action = this.actions.search;
    const url = parametrizedUrl || action.path;

    const params = {
      method: action.method,
      headers: this.headers
    };

    return fetch(url, params)
      .then(fetchStatus)
      .then(response => response.json())
      .then(successCallback || Logger.success)
      .catch(e => (failCallback || this.statusFailure(action.verb))(e));
  }

  statusFailure(action, id) {
    let errorMessage = `There was an error ${action} ${this.modelName}(s) `;
    if (id) {
      errorMessage += `for id ${id}`;
    }
    return (e) => {
      Logger.error(errorMessage, e);
      e.json().then(console.log);
    };
  }
}
