const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} is not a valid email`
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

//override toJSON to send only data that is necessary
UserSchema.methods.toJSON = function() {
  var user = this;
  //toObject() converts to regular object
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

//instance methods
//traditional functions used instead of arrow functions
//as arrow functions do not bind 'this'.
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({
      _id: user._id.toHexString(),
      access
    },
    'abc123'
  ).toString();

  user.tokens = user.tokens.concat([{
    access,
    token
  }]);

  return user.save().then(() => {
    return token;
  })
};

//model method
UserSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
};

UserSchema.pre('save', function(next) {
  var user = this;

  //if the 'password' field in the user document is modified
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = {
  User
};
