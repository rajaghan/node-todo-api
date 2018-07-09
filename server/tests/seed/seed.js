const jwt = require('jsonwebtoken');

const {
  ObjectID
} = require('mongodb');

const {
  Todo
} = require('./../../models/todo');

const {
  User
} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'raj@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({
      _id: userOneId,
      access: 'auth'
    }, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: userTwoId,
  email: 'ghanta@example.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({
      _id: userTwoId,
      access: 'auth'
    }, process.env.JWT_SECRET).toString()
  }]
}];

const populateUsers = (done) => {
  User.remove().then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

const todos = [{
  _id: new ObjectID(),
  text: 'This is first text',
  _creator: userOneId
}, {
  _id: new ObjectID(),
  text: 'This is second text',
  _creator: userTwoId
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos).then(() => {
      done();
    });
  });
};

module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
}
