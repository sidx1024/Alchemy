'use strict';

class Model {

  constructor(modelName, config) {
    this.config = config;
    this.modelName = modelName;
    this.uri = this.config.api.path + '/' + modelName.toLowerCase();
    this.endpoint = {
      get: {path: "get/{id}", method: "GET", expectedCode: 200},
      add: {path: "add", method: "POST", expectedCode: 201}, // HTTP_CREATED
      update: {path: "update/{id}", method: "PUT", expectedCode: 200},
      delete: {path: "delete", method: "DELETE", expectedCode: 200},
      search: {path: "search", method: "GET", expectedCode: 200}
    };
    this.headers = this.config.api.headers;
  }

  get(id = 1, successCallback, failCallback) {
    const request = {headers: this.headers, ...this.endpoint.get};
    const url = ['', this.uri, request.path, ''].join('/').replace('{id}', id);

    console.info(this.modelName, ">", this.url);
    fetch(url, {
      method: request.method,
      headers: request.headers
    })
      .then(
        function (response) {
          if (response.status !== request.expectedCode) {
            console.log('Looks like there was a problem. Status Code: ' +
              response);
            return failCallback(response);
          }

          // Examine the text in the response
          response.json().then(successCallback);
        }
      )
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
  }
}

class Course extends Model {
  constructor(...args) {
    console.info("args:", ...args);
    super(...args);
  }
}

class Alchemy {
  constructor() {
    this.config = {
      api: {
        path: "./api",
        headers: {
          Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBjZDg2Nzk3MGE0NjU2ZGZjMDVkMzgzZjk4ZTlkMjg1ZTBiMDdkMzk5YTViZGVjZjFmZmQwNDcyOTFhYmQ4MTNkOTY5NjRlMDg4MGIzZTAwIn0.eyJhdWQiOiIyIiwianRpIjoiMGNkODY3OTcwYTQ2NTZkZmMwNWQzODNmOThlOWQyODVlMGIwN2QzOTlhNWJkZWNmMWZmZDA0NzI5MWFiZDgxM2Q5Njk2NGUwODgwYjNlMDAiLCJpYXQiOjE1MTgyNjAxODAsIm5iZiI6MTUxODI2MDE4MCwiZXhwIjoxNTQ5Nzk2MTc5LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.OYZsUELaOhKujaOgJ3LcLBYG3srf_xQW-DDDn7yhiZvkyLYfnb7bslKkGcuSiOWvethpDWfVDPD3kCgpMdWAVW_nst9A-R4RaRYCFUY60P5fPJzey-cXssNHBwvn5VveIhzTFA3_puy34EExrkxoua5mS6rOQ5fE4JW5XJN0Q87aG_3mVt_iZ3KvdiF8Ftrk6raMw0inDLoNe9VCJwBX8j4lAGXEwnwzZgo9uPKo3MASTocBz3HJxiMFMKd7QMa--FjkBTz3xfIiLymEjqtAXSFCG9mH91i1s9NZIKglvWuC3lhBkWWb4a2lPWSBOit9srPEsapyAdpzjqSVrG8s5CwGu1innC4du84fkoiVYhJBXiSr_mJYmtDwuLyOiIiu2H9hGS4MXdeiQRbyYKPzVV6saqRlIXtPNxTrMVGdoExKYY0iiOH7nPX4FS2-iAQM4QG8XCJ-4K-HIigOY6rSVeRtGLlQ853PyIkL4NWJLV_JHymZ10ZVFmI7b86n34FriohDQGLh0zmLr0S6bj7qcLqt1l2q3MV6bLOLUKL-OBtWce59PSTtU6mwoHsaOA0sQDNobuycOElkYEL93sSup_3OT-nKrDVnm4tlxZ3l1k5lUqNIEwk6oO-HSi11Yb_B1ov_P-coco2ERjG6-SlqxM04g4Tg9CZF7lBon6eGXnA"
        }
      }
    };

    this.course = new Course('course', this.config);
  }

  course() {
    return this.course;
  }
}

window.alchemy = new Alchemy();
