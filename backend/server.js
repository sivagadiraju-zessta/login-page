const mysql = require('mysql');

const { generateAccessToken } = require('./Token');
const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'siva@5533',
  database: 'user',
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log('Database connected');
  } else {
    console.log('db error', err);
  }
});

const verification = (username, password) => {
  return new Promise((resolve, reject) => {
    return mysqlConnection.query(
      `select * from logindetails where username='${username}' and password='${password}'`,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          if (rows.length > 0) {
            const token = generateAccessToken(username);
            console.log('generated token', token);
            resolve(token);
          } else {
            resolve('Token creation failed');
          }
        }
      }
    );
  });
};

module.exports = {
  verification,
};
