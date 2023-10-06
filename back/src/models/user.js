const timespan = require('jsonwebtoken/lib/timespan');
const {Schema, model} = require ('mongoose');

const UserSchema = new Schema ({
    name: String,
    password: String,
    rol: String
})

module.exports = model('user', UserSchema);