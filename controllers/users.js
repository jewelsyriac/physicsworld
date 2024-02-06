const User = require("../models/user");

module.exports.register = async(req,res)=>{
    res.render('users/register')
};

module.exports.signUp = async(req,res)=>{
    try{
            const {email, username, password} = req.body;
            const user = new User({email,username});
            const registeredUser = await User.register(user,password);
            req.login(registeredUser, err=>{
                if(err) return next(err); 
                req.flash('success','You have successfully signed up!');
                res.redirect('/questions')});
    } catch(e){
            req.flash('error',e.message);
            res.redirect('/register');
    }
};

module.exports.loginForm = (req,res)=>{
    res.render('users/login');
};

module.exports.logIn = (req,res)=>{
    const User = req.session.passport.user;
    req.flash('success',`Welcome back ${User}.`);
    const redirectUrl = req.session.returnTo || '/questions';
    res.redirect(redirectUrl);
};

module.exports.logOut = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/');
    });
};