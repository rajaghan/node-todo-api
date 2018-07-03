const mongoose = require('mongoose');

const mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp';

mongoose.Promise = global.Promise;
mongoose.connect(mongoURL);


module.exports = {
  mongoose
};