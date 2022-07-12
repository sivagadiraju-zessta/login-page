const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3005;
const cors = require('cors');
const bodyparser = require('body-parser');

const { verification } = require('./server');
const { authenticateToken } = require('./Token');

app.use(express.json());
app.use(bodyparser.json());

app.use(
  cors({
    origin: '*',
  })
);

app.post('/', async (req, res) => {
  const { username, password } = req.body;
  console.log('username', username);
  const token = await verification(username, password);
  console.log('token', token);
  res.json({ token });
});

app.get('/', authenticateToken, (req, res) => {
  const userData = req.user;
  const username = userData.username;
  console.log('userData', userData);
  res.json({ username });
});

app.listen(port, () => {
  console.log(`server is running at the port ${port}`);
});
