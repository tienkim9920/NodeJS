var db = require('../db');
const { value } = require('../db');

module.exports.login = (req, res) => {
    res.render('auth/login')
}

module.exports.postLogin = (req, res) => {

    var emailLogin = req.body.email;
    var passwordLogin = req.body.password;

    console.log(emailLogin);

    var emailCheck = db.get('users').find(({email}) => email === emailLogin).value();

    if (!emailCheck){
        res.render('auth/login', {
            errorEmail: "Email is wrong!",
            values: req.body
        });
        return;
    }
    
    if (emailCheck.password !== passwordLogin) {
        res.render('auth/login', {
            errorPassword: "Password is wrong",
            values: req.body
        });
        return;
    }
    
    res.cookie('userID', emailCheck.id);
    res.redirect('/users');
}