const mongoose = require('mongoose');
const { db } = require('./models/user');
const createAdminUser = require('./config/init');

mongoose.connect('mongodb://127.0.0.1:27017/angular-auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log('db is connect'))
.catch(err => console.log(err));

db.once('open', () => {
    createAdminUser();
});