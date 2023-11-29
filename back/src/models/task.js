const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
    name: String,
    email: String,
    department: String,
    failType: String,
    anotherFailType: String,
    building: String,
    place: String,
    folio: String,
    imagePaths: [String],
    priority: String,
    status: String,
    createdAt: Date,
    finalizedAt: Date
}, {
    timestamps: false
});

module.exports = model('task', TaskSchema);
