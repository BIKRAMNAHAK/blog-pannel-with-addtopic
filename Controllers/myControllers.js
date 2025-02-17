const username = require('../Modules/Authontication')
const blog_Models = require('../Modules/BlogModels')
const bcrypt = require('bcrypt')


const defaultController = async (req, res) => {
    const blogs = await blog_Models.find({}).populate('comments');
    const bloggers = await username.find({});

    const loggedInUser = req.user;

    res.render('index', {
        allBlogs: blogs,
        bloggers: bloggers,
        loggedInUser: loggedInUser,
        login: req.flash('loginSuc')
    });

};

const userProfileController = (req, res) => {
    const loggedInUser = req.user;
    res.render('userProfile', { userDetails: loggedInUser })
}


module.exports = { defaultController, userProfileController };
