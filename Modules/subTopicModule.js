const mongoose = require('mongoose')

const subtopic = new mongoose.Schema({
    subtopic_name: {
        type: String,
        required: true
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    }

})

const Subtopic = mongoose.model('SubTopic', subtopic)

module.exports = Subtopic