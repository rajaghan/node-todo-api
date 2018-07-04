const {
  ObjectID
} = require('mongodb');

const {
  mongoose
} = require('./../server/db/mongoose');
const {
  User
} = require('./../server/models/user');

var id = '5b3b26981a56b21c6fa27bc0';

//checking for invalid object ids
if (!ObjectID.isValid(id)) {
  console.log('Invalid ID:', id);
}

User.findById(id).then((user) => {
  //null(falsy) is returned if the user is not found
  if (!user) {
    console.log('User not found');
  }
  console.log('User found: ', user);

});