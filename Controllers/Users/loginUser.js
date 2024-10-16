const users = require('../../Modules/Authontication')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const randomstring = require("randomstring");


const transporter = nodemailer.createTransport({
  host: "blog-pannel.gmail.com",
  port: 587,
  secure: true,
  service: 'gmail',
  auth: {
    user: 'bikramnahak9714@gmail.com',
    pass: 'xlea ehha ksml mefy'
  }

})

const userLoginFormController = (req, res) => {
  const passinfo = req.flash('resetPass');  
  res.render('login', { passinfo }); 
}

const loginsucContorller =async (req , res) => {
  const { email , password } = req.body
  const loginUser = await users.findOne({email : email})
      req.flash('loginSuc' , ` wellCome to ${loginUser.name}`)
      res.redirect('/')


}

const userLogoutController = async (req, res) => {
  req.logout((err) => {
    if (err) {
      done(err)
    } else {
      res.redirect('/login')
    }
  })
}

//user Password forgot part

const forgetPasswordController = (req, res) => {
  res.render('forget_password')
}

const chackUserController = async (req, res) => {
  const { email } = req.body;
  const user = await users.findOne({ email: email });

  if (user) {
    let token = randomstring.generate();
    await users.updateOne({ email: email }, { reset_token: token });
    const resetLink = `http://localhost:3208/passwordreset/${user._id}`;
    const mailOptions = {
      from: 'bikramnahak9714@gmail.com',
      to: user.email,
      subject: 'Reset password link',
      text: `Click here to reset your password: ${resetLink}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log('Error sending email:', err);
        res.redirect('/errorPage')
      } else {
        console.log('Email sent:', info.response);
        res.render('password_reset_conf')
      }
    });
  } else {
    res.redirect('/signup');
  }
};


const userPassResetPage = async (req, res) => {

  if (req.params.id) {
    let user = await users.findOne({ _id: req.params.id })
    try {
      if (user) {
        if (user.reset_token) {
          res.render('pass_reset', { id: req.params.id })
        }else{
          res.redirect('/errorPage')
        }
      } else {
        res.redirect('/errorPage')
      }
    } catch (err) {
      res.redirect('/errorPage')
    }

  } else {
    res.redirect('/login')
  }
}

const resetPassController = (req, res) => {
  const id = req.params.id;
  const { new_pass, conf_pass } = req.body;
  if (new_pass === conf_pass) {
    bcrypt.hash(new_pass, 10, async (err, hash) => {
      if (err) {
        return res.redirect('/pass_reset'); 
      } else {
        await users.findByIdAndUpdate({ _id: id }, { password: hash , reset_token: null});
      }
    });
    req.flash('resetPass' , 'password successfully forgoted')
     res.redirect('/login');
  }
};


const renderErrorPage = (req , res) =>{
  res.render('error_page')
}

module.exports = {
  userLoginFormController,
  loginsucContorller,
  userLogoutController,
  forgetPasswordController,
  chackUserController,
  userPassResetPage,
  resetPassController,
  renderErrorPage
}