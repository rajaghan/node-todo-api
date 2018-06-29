// const MongoClient = require('mongodb').MongoClient;
//ES6 destructuring equivalent to above statement that is commented
const {
  MongoClient,
  ObjectID
} = require('mongodb');

const mongoURL = 'mongodb://10.2.2.102:27017/TodoApp'

//mongo v3 gets client instead of db
MongoClient.connect(mongoURL, (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server');

  //findOneAndUpdate(filter, update operators, options)
  db.collection('Users').findOneAndUpdate({
    state: 'karnataka'
  }, {
    $set: {
      name: 'Rajasekhar Ghanta'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  }).catch((err) => {
    console.log(err);
  });

  //db.close();
});
