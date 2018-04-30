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
        url += `department_id=${encodeURI(searchParams.departmentId.toString())}&`;
      }
      if (typeof searchParams.text !== 'undefined') {
        url += `text=${encodeURI(searchParams.text.toString())}&`;
      }
      if (typeof searchParams.level !== 'undefined') {
        url += `level=${encodeURI(searchParams.level.toString())}&`;
      }
      if (typeof searchParams.limit !== 'undefined') {
        url += `limit=${encodeURI(searchParams.limit.toString())}&`;
      }
    }

    return super.search(url, successCallback, failCallback);
  }

  static transform(data, type) {
    if (!data) {
      return [];
    }
    switch (type) {
      case 'table': {
        let transformedData = [];
        data.forEach((_course) => {
          const course = {};
          course.id = _course.id;
          course.code = _course.code;
          course.alias = _course.alias;
          course.name = _course.name;
          course.lecture = _course.lecture;
          course.practical = _course.practical;
          course.tutorial = _course.tutorial;
          course.credit = _course.credit;
          course.is_elective = _course.is_elective ? '*' : '';
          course.persons = _course.persons;
          transformedData.push(course);
        });
        return transformedData;
      }
      case 'short-info': {
        let course = data;
        if (Array.isArray(data)) {
          course = data[0];
        }
        return arrayToHtml([course.id, course.code, course.alias, course.name]);
      }
      default: {
        Logger.error(`Cannot transform data to type ${type}`);
      }
    }
    return transformedData;
  }
}

class Department extends Model {
}

class Faculty extends Model {
}

class Location extends Model {
  search(searchParams, successCallback, failCallback) {
    let url = this.actions.search.path;

    if (searchParams) {
      if (typeof searchParams.departmentId !== 'undefined') {
        url += `department_id=${encodeURI(searchParams.departmentId.toString())}&`;
      }
      if (typeof searchParams.text !== 'undefined') {
        url += `text=${encodeURI(searchParams.text.toString())}&`;
      }
      if (typeof searchParams.limit !== 'undefined') {
        url += `limit=${encodeURI(searchParams.limit.toString())}&`;
      }
    }

    return super.search(url, successCallback, failCallback);
  }
}

class Programme extends Model {
  static transform(programme, type) {
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

// eslint-disable-next-line no-unused-vars
class Alchemy {
  constructor(options) {
    this.config = {
      api: {
        path: './api',
        headers: {
          Authorization: window.accessToken,
          'Content-Type': 'application/json'
        }
      }
    };
    this.keys = { institute: 1, programme: 1 };
    this.ready = false;
    this.onReady = options.onReady;
    this.onFail = options.onFail;
    this.current = { programme: null, departments: null, ONE_PRACTICAL_CREDIT: 1 };
    this.course = new Course('course', this.config);
    this.location = new Location('location', this.config);
    this.department = new Department('department', this.config);
    this.faculty = new Faculty('faculty', this.config);
    this.programme = new Programme('programme', this.config);
    this.pingAPI(this.init.bind(this), this.onFail);
  }

  init() {
    let requestsSent = 0;
    let requestsReceived = 0;
    let successfulRequests = 0;
    // eslint-disable-next-line no-func-assign
    onRequestReceived = onRequestReceived.bind(this);

    this.programme.get(this.keys.programme, onProgrammeReceived.bind(this));
    requestsSent += 1;
    this.department.all(onDepartmentsReceived.bind(this));
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
    function onDepartmentsReceived(response) {
      if (response) {
        this.current.departments = response;
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
