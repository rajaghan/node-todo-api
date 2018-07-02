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

app.listen(3000, () => {
  console.log('server started on port 3000');
});
