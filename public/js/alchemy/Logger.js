class Logger {
  static get css() {
    return {
      success: 'background-color: #C5E0B3; color: #385724',
      fail: 'background-color: #F7CAAC; color: #843C0B',
      warn: 'background-color: #FFE599; color: #806000',
      info: 'background-color: #B4C6E7; color: #002060'
    };
  };

  static success(response) {
    if(response && typeof response.status !== 'undefined') {
      console.log('%c  Response success  \n', Logger.css.success, response.status, response.statusText,
        response);
    } else {
      console.log('%c  General success  \n', Logger.css.success, response);
    }
    throw response;
  }

  static error(response) {
    if(response && typeof response.status !== 'undefined') {
      console.log('%c  Response failure  \n', Logger.css.fail, response.status, response.statusText, response);
    } else {
      console.log('%c  General failure  \n', Logger.css.fail, response);
    }
    throw response;
  }
}
window.logger = new Logger();
