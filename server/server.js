var {
  ObjectID
} = require('mongodb');

var express = require('express');
var bodyPraser = require('body-parser');

var {
  mognoose
} = require('./db/mongoose');
var {
  Todo
} = require('./models/todo');
var {
  User
} = require('./models/user');

var app = express();

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
  }).catch(err => res.status(400).send(err));
});

app.listen(3000, () => {
  console.log('server started on port 3000');
});

module.exports = {
  app
};