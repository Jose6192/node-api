const {Schema, model} = require('mongoose');

const TaskSchema = new Schema({
    name: String,
    tile: String,
    description: String,
    location: String,
    department: String,
    priority: String,
    image: String
},{
    timestamps: true
})

module.exports = model('task', TaskSchema);