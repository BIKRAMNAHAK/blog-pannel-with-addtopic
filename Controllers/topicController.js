
const addTopic = require('../Modules/addTopicModels')
const SubTopic = require('../Modules/subTopicModule')
const User = require('../Modules/Authontication')


//topic Controller
const addTopicController = (req, res) => {
    res.render('addTopic')
}

const addTopicControllerPost = async (req, res) => {

    let Topics = new addTopic({
        Topicname: req.body.topicName,
    })

    await Topics.save()

    res.redirect('/Topics')
}


//Subtopic controller

const renderSubtopic = async (req, res) => {
    const allTopic = await addTopic.find({})
    const allSubtopic = await SubTopic.find().populate('topic')


    res.render('subTopics', { allTopic, allSubtopic, user: req.user })
}

const postSubtopicController = (req, res) => {

    const addSubtopic = new SubTopic({
        subtopic_name: req.body.subtopicName,
        topic: req.body.topic,
        user: req.user._id
    })

    addSubtopic.save()

    res.redirect('/subTopic')
}


const deleteSubtopicController =async (req, res) => {
    const id = req.params.id
    const delete_subtopic = await SubTopic.findByIdAndDelete(id)
    res.redirect('/subTopic')
}

module.exports = {
    addTopicController,
    addTopicControllerPost, 
    renderSubtopic,
    postSubtopicController,
    deleteSubtopicController,
}