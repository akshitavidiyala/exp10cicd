const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Exp 10 Full CI/CD Pipeline 🚀');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});