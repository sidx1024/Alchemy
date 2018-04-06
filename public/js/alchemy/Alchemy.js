/* eslint-disable no-undef,prefer-destructuring */

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
