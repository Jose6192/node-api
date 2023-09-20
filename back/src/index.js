const express = require('express');
const app = express();

const PORT = 3000;

require('./database.js');

app.use(express.json());

app.use('/', require('./routes/index.js'))

app.listen(PORT);
console.log(`server running on port ${PORT}`);