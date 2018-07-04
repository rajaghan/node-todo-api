const mongoose = require('mongoose');

const mongoURL = process.env.MONGODB_URI;

mongoose.Promise = global.Promise;
mongoose.connect(mongoURL);

module.exports = {
  mongoose
};
