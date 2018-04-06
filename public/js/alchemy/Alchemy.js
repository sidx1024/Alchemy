/* eslint-disable no-undef,prefer-destructuring,no-use-before-define */

/*
|--------------------------------------------------------------------------
| Alchemy
|--------------------------------------------------------------------------
|
| Essential Class Models
|
*/

class Course extends Model {
  search(searchParams, successCallback, failCallback) {
    let url = this.actions.search.path;

    if (searchParams) {
      if (typeof searchParams.departmentId !== 'undefined') {
        url += `department_id=${searchParams.departmentId.toString()}&`;
      }
      if (typeof searchParams.text !== 'undefined') {
        url += `text=${searchParams.text.toString()}&`;
      }
      if (typeof searchParams.level !== 'undefined') {
        url += `level=${searchParams.level.toString()}&`;
      }
    }

    return super.search(url, successCallback, failCallback);
  }

  transform(data, type) {
    const transformedData = [];
    if (!data) {
      return transformedData;
    }
    switch (type) {
      case 'table':
        data.forEach((_course) => {
          const course = {};
          course.id = _course.id;
          course.code = _course.code;
          course.name = _course.name;
          course.l = _course.scheme[0];
          course.p = _course.scheme[1];
          course.t = _course.scheme[2];
          course.credit = _course.credit;
          transformedData.push(course);
        });
        break;
      default:
        Logger.error(`Cannot transform data to type ${type}`);
    }
    return transformedData;
  }
}

class Department extends Model {
}

class Faculty extends Model {
}

class Programme extends Model {
  transform(programme, type) {
    const transformedData = [];
    switch (type) {
      case 'list':
        for (let i = 1; i <= programme.levels; i += 1) {
          transformedData.push({ id: i, level: i });
        }
        break;
      default:
        Logger.error(`Cannot transform data to type ${type}`);
    }
    return transformedData;
  }
}

class Alchemy {
  constructor(options) {
    this.config = {
      api: {
        path: './api',
        headers: {
          Authorization: window.accessToken
        }
      }
    };
    this.keys = { institute: 1, programme: 1 };
    this.ready = false;
    this.onReady = options.onReady;
    this.onFail = options.onFail;
    this.current = { programme: null };
    this.course = new Course('course', this.config);
    this.department = new Department('department', this.config);
    this.faculty = new Faculty('faculty', this.config);
    this.programme = new Programme('programme', this.config);
    this.pingAPI(this.init.bind(this), this.onFail);
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

  programme() {
    return this.programme;
  }

  init() {
    let requestsSent = 0;
    let requestsReceived = 0;
    let successfulRequests = 0;
    // eslint-disable-next-line no-func-assign
    onRequestReceived = onRequestReceived.bind(this);

    this.programme.get(this.keys.programme, onProgrammeReceived.bind(this));
    requestsSent += 1;

    function onRequestReceived(success, response) {
      if (success) {
        successfulRequests += 1;
      } else {
        Logger.error('Unexpected response from server', response);
      }
      requestsReceived += 1;
      if (requestsSent === requestsReceived) {
        if (requestsSent === successfulRequests) {
          this.ready = true;
          if (typeof this.onReady === 'function') {
            this.onReady();
          } else {
            Logger.success('Alchemy is ready.');
          }
        } else if (typeof this.onFail === 'function') {
          this.onFail();
        }
      }
    }
    function onProgrammeReceived(response) {
      if (response) {
        this.current.programme = response;
        onRequestReceived(true);
      } else {
        onRequestReceived(false, response);
      }
    }
  }

  pingAPI(successCallback, failCallback) {
    const url = this.config.api.path;
    fetch(url)
      .then(fetchStatus)
      .then(successCallback || Logger.success)
      .catch(failCallback.bind(this, `Please check the API at ${url}`) || Logger.error);
  }
}
