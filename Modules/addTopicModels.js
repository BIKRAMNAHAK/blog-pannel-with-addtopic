const mongoose = require('mongoose');


const addTopic = new mongoose.Schema({
    Topicname: {
        type: String,  
        required: true,
    }
});


const addTopicModel = mongoose.model('Topic', addTopic);

module.exports = addTopicModel;
