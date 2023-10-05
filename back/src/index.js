const express = require('express');
const app = express();
const cors = require('cors');

const PORT = 3000;

require('./database.js');

app.use(cors());
app.use(express.json());

app.use('/', require('./routes/user.js'));
app.use('/', require('./routes/task.js'));

app.listen(PORT);
console.log(`server running on port ${PORT}`);