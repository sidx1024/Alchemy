'use strict';

class Course extends Model {
  constructor(...args) {
    super(...args);
  }

  search(params, successCallback, failCallback) {
    const url = [this.uri, this.endpoint.get.path].join('/').replace('{id}', id);

    if (!params.department_id || !params.level || !params.query) {
      Logger.error('')
    }

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

class Department extends Model {
  constructor(...args) {
    super(...args);
  }
}

class Faculty extends Model {
  constructor(...args) {
    super(...args);
  }
}

class Alchemy {
  constructor() {
    this.config = {
      api: {
        path: './api',
        headers: {
          Authorization: window.accessToken
        }
      }
    };
    this.course = new Course('course', this.config);
    this.department = new Department('department', this.config);
    this.faculty = new Faculty('faculty', this.config);
  }

  department() {
    return this.department;
  }

  course() {
    return this.course;
  }

  faculty() {
    return this.faculty;
  }
}

window.alchemy = new Alchemy();
