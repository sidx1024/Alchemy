class Model {
  constructor(modelName, config) {
    this.config = config;
    this.modelName = modelName;
    this.uri = this.config.api.path + '/' + modelName.toLowerCase();
    this.endpoint = {
      all: {path: 'all', method: 'GET'},
      get: {path: 'get/{id}', method: 'GET'},
      add: {path: 'add', method: 'POST'}, // HTTP_CREATED
      update: {path: 'update/{id}', method: 'PUT'},
      delete: {path: 'delete', method: 'DELETE'},
      search: {path: 'search', method: 'GET'}
    };
    this.headers = this.config.api.headers;
    this.fetchStatus = function (response) {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(response);
      }
    };
  }

  all(successCallback, failCallback) {
    const url = [this.uri, this.endpoint.all.path].join('/');

    const params = {
      method: this.endpoint.get.method,
      headers: this.headers
    };

    return fetch(url, params)
      .then(this.fetchStatus)
      .then((response) => response.json())
      .then(successCallback)
      .catch(failCallback)
      .catch(Logger.error);
  }
  get(id = 1, successCallback, failCallback) {
    const url = [this.uri, this.endpoint.get.path].join('/').replace('{id}', id);

    const params = {
      method: this.endpoint.get.method,
      headers: this.headers
    };

    return fetch(url, params)
      .then(this.fetchStatus)
      .then((response) => response.json())
      .then(successCallback)
      .catch(failCallback)
      .catch(Logger.error);

  }
  add(id = 1, successCallback, failCallback) {
    const url = [this.uri, this.endpoint.get.path].join('/').replace('{id}', id);

    const params = {
      method: this.endpoint.get.method,
      headers: this.headers
    };

    return fetch(url, params)
      .then(this.fetchStatus)
      .then((response) => response.json())
      .then(successCallback)
      .catch(failCallback)
      .catch(Logger.error);
  }
}
