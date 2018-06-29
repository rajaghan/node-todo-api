const mongoose = require('mongoose');

const mongoURL = 'mongodb://10.2.2.102:27017/TodoApp';

mongoose.Promise = global.Promise;
mongoose.connect(mongoURL);

var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

// var newTodo = new Todo({
//   text: 'cook dinner'
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }).catch((err) => {
//   console.log('Unable to save doc', err);
// });
//
// var anotherNewTodo = new Todo({
//   text: 'eat dinner',
//   completed: false,
//   completedAt: 0
// });
//
// anotherNewTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }).catch((err) => {
//   console.log('Unable to save doc', err);
// });

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minLength: 1
  }
});

var newUser = new User({
  email: '  raj@test.com'
});

newUser.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
}).catch((err) => {
  console.log('Unable to save doc', err);
});
