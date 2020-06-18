var db = require('../db');

module.exports.CheckMiddle = (req, res, next) => {
    if (!req.cookies.userID){
        res.redirect('/auth/login');
        return;
    }

    var user = db.get('users').find(({id}) => id === req.cookies.userID).value();

    if (!user){
        res.redirect('/auth/login');
        return;
    }

    next();
};