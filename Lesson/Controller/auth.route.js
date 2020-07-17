var md5 = require('md5');

var User = require('../models/users.model')

module.exports.login = (req, res) => {
    res.render('auth/login')
}

module.exports.postLogin = async (req, res) => {

    var emailLogin = req.body.email;
    var passwordLogin = md5(req.body.password);

    var emailCheck = await User.findOne({email: emailLogin})

    if (!emailCheck){
        res.render('auth/login', {
            errors: "Email is wrong!",
            values: req.body
        });
        return;
    }
    
    if (emailCheck.password !== passwordLogin) {
        res.render('auth/login', {
            errors: "Password is wrong",
            values: req.body
        });
        return;
    }
    
    res.cookie('userID', emailCheck._id, {
        signed: true
    });

    res.redirect('/');
}

module.exports.logout = (req, res) => {

    req.session = null

    res.cookie('userID', {
        signed: false
    });

    res.redirect('/auth/login')
}