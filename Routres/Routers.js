const express = require('express');
const router = express.Router();
const controller = require('../Controllers/myControllers')
const loginController = require('../Controllers/Users/loginUser')
const registerController = require('../Controllers/Users/registrationUser')
const BlogController = require('../Controllers/blogController')
const upload = require('../Confring/imageUplode')
const passport = require('../Confring/passport_confi')
const isAuth = require('../meddlewere/midlewereAuth')
const userProfile = require('../Controllers/userProfileController')
const topic_controller = require('../Controllers/topicController')

//Routing area

//Home  and userProfile router
router.get('/',isAuth,controller.defaultController);
router.get('/userProfile' ,isAuth, controller.userProfileController)

//userProfile controller route
router.get('/change-password',isAuth , userProfile.changePassowrdController)
router.post('/change_pass' ,isAuth , userProfile.updatePassController)
router.get('/change_profile/:id',isAuth ,userProfile.getChangeProfile )
router.post('/change_name_phone/:id',isAuth , userProfile.updateInfoController)

//bloging add route
router.get('/addForm',isAuth, BlogController.addBlogFormController)
router.post('/addblog',isAuth, upload.single('image'), BlogController.createBlogController)
router.get('/allblog',isAuth, BlogController.getBlogController)
router.get('/myBlogs' ,isAuth,BlogController.myBlogerController)
router.get('/edit/:id',isAuth,BlogController.editBlogController)
router.post('/updateBlogs/:id',isAuth, upload.single('updateimg'),BlogController.updateBlogController)
router.get ('/delete/:id',isAuth, BlogController.deleteBlogController)

//singup page route
router.get('/signup',registerController.userRegFormController)
router.post('/signuppost',registerController.userRegFormPostController)

//login page route
router.get('/login',loginController.userLoginFormController)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),loginController.loginsucContorller)
router.get('/logout' ,loginController.userLogoutController)

// forget Password route
router.get('/forgot-password',loginController.forgetPasswordController );
router.post('/confUser',loginController.chackUserController );
router.get('/passwordreset/:id' , loginController.userPassResetPage)
router.post('/reset_pass/:id',loginController.resetPassController)
router.get('/errorPage', loginController.renderErrorPage)

//topic addition route
router.get('/Topics',isAuth,topic_controller.addTopicController)
router.post('/topic_post',isAuth,topic_controller.addTopicControllerPost)

//subTopic addition route
router.get('/subTopic',isAuth ,topic_controller.renderSubtopic)
router.post('/post_subTopic',isAuth, topic_controller.postSubtopicController)
router.post('/delete_subtopic/:id',isAuth, topic_controller.deleteSubtopicController)

module.exports = router;
