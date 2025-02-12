const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
        title: { type: String, required: true },
        description: { type: String },
        deadline: { type: Date, required: true },
        category: { type: String, enum: ['Shopping', 'Personal', 'Work'], default: 'Personal' }, 
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
})

module.exports = mongoose.model('Task', taskSchema);