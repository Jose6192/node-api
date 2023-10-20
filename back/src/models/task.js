const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
    name: String,
    title: String,
    description: String,
    location: String,
    department: String,
    priority: String,
    imagePaths: [String]
}, {
    timestamps: true
});

module.exports = model('task', TaskSchema);
