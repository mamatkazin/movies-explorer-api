const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { HTTPError } = require('../services/error');
const { INVALID_AUTH, INVALID_FIELD } = require('../services/const');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: INVALID_FIELD,
      isAsync: false,
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false,
  },
});

userSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.password;

  return obj;
};

userSchema.statics.authenticator = function authenticator(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new HTTPError(401, INVALID_AUTH);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new HTTPError(401, INVALID_AUTH);
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
