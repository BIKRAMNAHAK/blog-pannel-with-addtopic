const mongoose = require('mongoose');

const blogModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String
    },
    path: {
        type: String
    },
    userEmail: {
        type: String
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]

}, { timestamps: true }); 
module.exports = mongoose.model('Blogs', blogModel);
