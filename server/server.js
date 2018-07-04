require('./config/config');

var {
  ObjectID
} = require('mongodb');

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
  Todo.find().then((todos) => {
    res.send({
      todos
    });
  }).catch(err => res.status(400).send(err));
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send('Resource not found');
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      res.status(404).send('Resource not found');
    }

    res.status(200).send({
      todo
    });
  }).catch(err => res.status(400).send());
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send('Resource not found');
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      res.status(404).send('Resource not found');
    }

    res.status(200).send({
      todo
    });
  }).catch(err => res.status(400).send());
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
