const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const AppConstants = require('./../settings/constants');
let userSchema = Schema ({
        username: {
            type: String,
            index: {unique: true},
            minLength: AppConstants.USERNAME_MIN_LENGTH,
            maxLength: AppConstants.USERNAME_MAX_LENGTH
        },
        age: {
            type: Number,
            default: null,
            minLength: AppConstants.AGE_MIN_LENGTH,
            maxLength: AppConstants.AGE_MAX_LENGTH
        },
        password: {
            type: String,
            minLength: AppConstants.PASSWORD_MIN_LENGTH,
            maxLength: AppConstants.PASSWORD_MAX_LENGTH
        },
        email: {
            type: String,
            lowercase: true,
            minLength: AppConstants.EMAIL_MIN_LENGTH,
            maxLength: AppConstants.EMAIL_MAX_LENGTH,

        },
        name: {
          type: String,
          minLength: AppConstants.NAME_MIN_LENGTH,
          maxLength: AppConstants.NAME_MAX_LENGTH,
          default: null
        }
});

module.exports = mongoose.model('users',userSchema);
