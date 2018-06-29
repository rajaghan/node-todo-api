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

  //deleteMany
  // db.collection('Users').deleteMany({
  //   location: 'bangalore'
  // }).then((result) => {
  //   console.log(result);
  // }).catch((err) => {
  //   console.log(`Error: ${err}`);
  // });

  //deleteOne
  // db.collection('Users').deleteOne({
  //   location: 'bangalore'
  // }).then((result) => {
  //   console.log(result);
  // }).catch((err) => {
  //   console.log(`Error: ${err}`);
  // });
  //

  //findOneAndDelete
  db.collection('Users').findOneAndDelete({
    location: 'bangalore'
  }).then((result) => {
    console.log(result);
    //insert the deleted document again with an additional field
    result.value.state = 'karnataka';
    db.collection('Users').insertOne(result.value, (err, res) => {
      if (err) {
        return console.log('Unable to insert document into Users database', err);
      }
      console.log(JSON.stringify(res.ops));
    });
  }).catch((err) => {
    console.log(`Error: ${err}`);
  });

  //db.close();
});
