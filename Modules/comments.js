const mongoose = require('mongoose')

const comments = new mongoose.Schema({
    comments:{
        type : String
    }
})

const userComments = mongoose.model('comments', comments)

module.exports = userComments