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
            default: 18
        },
        Password: {
            type: String,
            minLength: AppConstants.PASSWORD_MIN_LENGTH,
            maxLength: AppConstants.PASSWORD_MAX_LENGTH
        }
});

module.exports = mongoose.model('users',userSchema);
