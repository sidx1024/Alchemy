/*
|--------------------------------------------------------------------------
| Logger
|--------------------------------------------------------------------------
|
| A wrapper around the 'console'.
| For better debugging
|
*/

class Logger {
  static get css() {
    return {
      success: 'background-color: #C5E0B3; color: #385724',
      fail: 'background-color: #F7CAAC; color: #843C0B',
      warn: 'background-color: #FFE599; color: #806000',
      info: 'background-color: #B4C6E7; color: #002060'
    };
  }

  static success(response) {
    console.log('%c  General success  \n', Logger.css.success, response);
    return response;
  }

  static error(response, error, extra) {
    console.log('%c  General failure  \n', Logger.css.fail, response);
    if (error) {
      console.error(error, extra);
    }
    console.trace('\n');
    return response;
  }
}
window.logger = new Logger();
