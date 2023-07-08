const express = require('express');
const Ask = require('./route/Ask');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', async (req, res) => {
  const message = req.body;
  const resp = await Ask(message);
  res.send(resp);
});

app.listen(port, () => {
});
