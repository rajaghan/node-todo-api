const mongoose = require('mongoose');

const mongoURL = 'mongodb://192.168.56.101:27017/TodoApp';

mongoose.Promise = global.Promise;
mongoose.connect(mongoURL);


module.exports = {
  mongoose
};
