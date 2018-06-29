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

  //returns cursor
  // db.collection('Todos').find({
  //   _id: new ObjectID('5b34e7d0ed2eb02a8cd30e97')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }).catch((err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  // db.collection('Users').find().count().then((count) => {
  //   console.log('Todos count: ', count);
  // }).catch((err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  db.collection('Users').find({
    name: 'Rajasekhar'
  }).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
  }).catch((err) => {
    console.log('Unable to fetch todos', err);
  });

  db.close();
});
