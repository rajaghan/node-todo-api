// const MongoClient = require('mongodb').MongoClient;
//ES6 destructuring equivalent to above statement that is commented
const {
  MongoClient,
  ObjectID
} = require('mongodb');

const mongoURL = 'mongodb://10.2.2.102:27017/TodoApp';

//mongo v3 gets client instead of db
MongoClient.connect(mongoURL, (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connected to mongodb server');
  //mongo v3 code
  // const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  db.collection('Users').insertOne({
    name: 'Rajasekhar',
    age: 25,
    location: 'bangalore'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert document into Users database', err);
    }
    console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
  });

  db.close();
  // mongo v3 code
  // client.close();
});
