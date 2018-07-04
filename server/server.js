require('./config/config');

var express = require('express');
var bodyPraser = require('body-parser');
var _ = require('lodash');

var {
  mongoose
} = require('./db/mongoose');
var {
  Todo
} = require('./models/todo');
var {
  User
} = require('./models/user');

const {
  authenticate
} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

//middleware to parse body to JSON
app.use(bodyPraser.json());

//create a new todo
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }).catch(err => res.status(400).send(err));
});

app.get('/todos', (req, res) => {
  Todo.find().then((docs) => {
    res.send(JSON.stringify(docs, undefined, 2));
  }).catch(err => res.status(404).send(err));
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

//private route
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

module.exports = {
  app
};
