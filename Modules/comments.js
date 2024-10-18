const mongoose = require('mongoose');

// Comment Schema
const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blogs', // Refers to the Blog Model
        required: true
    },
    userEmail: {
        type: String, // To track which user made the comment
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
