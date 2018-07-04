// const {
//   SHA256
// } = require('crypto-js');
//
// var message = 'I am user number 3';
// //one way algorithm to store hashed passwords instead of plain text, which is insecure.
// var hash = SHA256(message).toString();
//
// // console.log(`Message: ${message}`);
// // console.log(`Hash: ${hash}`);
//
// var data = {
//   id: 4
// };
//
// //somesecret is the salt that exists only on server
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// if (resultHash === token.hash) {
//   console.log('data was not changed');
// } else {
//   console.log('data was chagned do not trust');
// }

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// var data = {
//   id: 10
// };
//
// //generate a signed token with the help of secret
// var token = jwt.sign(data, '123abc')
// console.log(token);
//
// //takes token and secret and verifies the token
// var decoded = jwt.verify(token, '123abc');
// console.log(decoded);

var password = '123!';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// })

var hashedPassword = '$2a$10$fdGDwyUIkdAARWVsNyG46OTIG45Z.PmRrMQXB.jQAxZ1MMtXDIS2u';

//hashed password is self contained string (including the generated salt)
//that bcrypt can work upon to comapare with plain text
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});
