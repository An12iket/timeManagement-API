const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
        title: { type: String, required: true },
        description: { type: String },
        deadline: { type: Date, required: true },
        status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
        category: { type: String, enum: ['study', 'personal', 'work'], default: 'personal' }, 
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('Task', taskSchema);