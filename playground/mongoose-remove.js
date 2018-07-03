const {
  ObjectID
} = require('mongodb');

const {
  mongoose
} = require('./../server/db/mongoose');
const {
  User
} = require('./../server/models/user');

const {
  Todo
} = require('./../server/models/todo');

var id = '5b3b634ace1e33307f05a06e';

//checking for invalid object ids
if (!ObjectID.isValid(id)) {
  console.log('Invalid ID:', id);
}

//Todo.remove({})
//Todo.findOneAndRemove({_id: ''})

Todo.findByIdAndRemove(id).then((todo) => {
  //null(falsy) is returned if the user is not found
  if (!todo) {
    console.log('User not found');
  }
  console.log('User deleted: ', todo);

});