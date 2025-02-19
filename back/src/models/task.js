const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
    name: String,
    email: String,
    department: String,
    failType: String,
    anotherFailType: String,
    building: String,
    place: String,
    description: String,
    folio: String,
    imagePaths: [String],
    priority: String,
    solvedby: String,
    status: String,
    createdAt: Date,
    finalizedAt: Date
}, {
    timestamps: false
});

module.exports = model('task', TaskSchema);
