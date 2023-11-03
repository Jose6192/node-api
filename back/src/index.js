const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 3000;

require('./database.js');

//midelewares
app.use(cors());
app.use(express.static('public')); // Para que se pueda acceder a la carpeta public desde el navegador
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes
app.use('/', require ('./routes/images.js'));
app.use('/', require('./routes/user.js'));
app.use('/', require('./routes/task.js'));

app.listen(PORT);
console.log(`server running on port ${PORT}`);