var User = require('../models/users.model')

module.exports.CheckMiddle = async (req, res, next) => {
    if (!req.signedCookies.userID){
        res.redirect('/auth/login');
        return;
    }

    var user = await User.findOne(({_id: req.signedCookies.userID}))

    if (!user){
        res.redirect('/auth/login');
        return;
    }

    next();
};