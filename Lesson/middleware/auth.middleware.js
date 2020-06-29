var db = require('../db');

module.exports.CheckMiddle = (req, res, next) => {
    if (!req.signedCookies.userID){
        res.redirect('/auth/login');
        return;
    }

    var user = db.get('users').find(({id}) => id === req.signedCookies.userID).value();

    if (!user){
        res.redirect('/auth/login');
        return;
    }

    next();
};