const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
    name: String,
    title: String,
    description: String,
    location: String,
    department: String,
    priority: String,
    imagePaths: [String],
    status: String,
    completedTime: Date,
}, {
    timestamps: true
});

module.exports = model('task', TaskSchema);
