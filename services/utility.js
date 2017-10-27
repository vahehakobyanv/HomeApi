const AppConstants = require('./../settings/constants');

const ErrorTypes = {
    VALIDATION_ERROR: 'validation_error',
    USERNAME_PASS_MISSING: 'username pass missing',
    USERNAME_INVALID_RANGE: 'USERNAME_INVALID_RANGE',
    PASSWORD_INVALID_RANGE: 'PASSWORD_INVALID_RANGE',
    ERROR_CREATION_USER: 'error creation user',
    UNKNOWN_ERROR: 'unknown_error'
}
class Utility {
      static parseQuery(req, res, next) {
            req.query.offset = parseInt(req.query.offset);
            if(!isFinite(req.query.offset)) {
                  req.query.offset = AppConstants.OFFSET_DEFAULT_VALUE;
            }

            req.query.limit = parseInt(req.query.limit);
            if(!isFinite(req.query.limit)) {
                  req.query.limit = AppConstants.LIMIT_DEFAULT_VALUE;
            }
            next();
      }
      static GenerateErrorMessage(type,options) {
        let error_object = {
            type: type || ErrorTypes.UNKNOWN_ERROR,
            message: 'Something went wrong'
        }
        switch (type) {
          case ErrorTypes.USERNAME_PASS_MISSING:
               error_object.message = 'username or password are missing please enter username and password';
               break;
          case ErrorTypes.USERNAME_INVALID_RANGE:
               error_object.message = 'Your username range is invalid ';
               break;
          case ErrorTypes.PASSWORD_INVALID_RANGE:
               error_object.message = 'Your password range is invalid ';
               break;
          case ErrorTypes.ERROR_CREATION_USER:
               error_object.message = 'error when you create new user';
               break;

        }
          return error_object;
      }
}

module.exports = Utility;
module.exports.ErrorTypes =ErrorTypes;
