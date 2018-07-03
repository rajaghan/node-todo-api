const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/TodoApp';

mongoose.Promise = global.Promise;
mongoose.connect(mongoURL);


module.exports = {
  mongoose
};
