const shortid = require('shortid');
var md5 = require('md5');

var db = require('../db');

module.exports.index = (req, res) => {
    res.render('users/index', {
        users: db.get('users').value()
    });
}

module.exports.delete = (req, res) => {
    var idCheck = req.params.id;

    console.log(idCheck);

    var user = db.get('users').find(({id}) => id === idCheck).value();

    console.log("-----------------------------------------------")

    db.get('users').remove(({id}) => id === user.id).write();

    res.redirect('/users');


    // var idCheck = req.params.id;

    // console.log(idCheck);

    // var user = db.get('users').find(({id}) => id === idCheck).value();

    // console.log("-----------------------------------------------")

    // var length = db.get('users').value().length;

    // var temp;

    // for (var i = 0; i < db.get('users').value().length; i++){
    //     if (db.get('users').value()[i].id === user.id) {
    //         temp = db.get('users').value()[i];
    //         db.get('users').value()[i] = db.get('users').value()[length - 1];
    //         db.get('users').value()[length - 1] = temp;
    //         db.get('users').pop().write();
    //     }
    //     console.log('-----Test------');
    // }

    // console.log(db.get('users').value().length);
    // console.log(db.get('users').value());

    // res.render('users/index', {
    //     users: db.get('users').value()
    // });
}

module.exports.search = (req, res) => {
    var q = req.query.q.toUpperCase();

    var arrLowdb = db.get('users').value();

    var matchUsers = [];

    for (var i = 0; i < arrLowdb.length; i++){
        if (arrLowdb[i].name.toUpperCase().indexOf(q) > -1){
            matchUsers.push(arrLowdb[i]);
        }
    }

    res.render('users/index', {
        users: matchUsers
    });
}

module.exports.create = (req, res) => {
    res.render('users/create');
}

module.exports.views = (req, res) => {
    var idViews = req.params.id;

    var user = db.get('users').find(({id}) => id === idViews).value();

    res.render('users/views', {
        users: user
    });
}

module.exports.createUser = (req, res) => {
    
    req.body.id = shortid.generate();
    var reqId = req.body.id;

    var reqName = req.body.name;
    if (!reqName){
        res.render('users/create', {
            error: ["Name can't empty!"],
            values: req.body
        })
        return;
    }

    var reqPhone = req.body.phone;
    if(!reqPhone){
        res.render('users/create', {
            error: ["Phone can't empty!"],
            values: req.body
        })
        return;
    }

    var reqEmail = req.body.email;
    if(!reqEmail){
        res.render('users/create', {
            error: ["Email can't empty!"],
            values: req.body
        })
        return;
    }

    var reqPassword = req.body.password;
    var safePassword = md5(reqPassword);
    if(!safePassword){
        res.render('users/create', {
            error: ["Password can't empty!"],
            values: req.body
        })
        return;
    }

    var reqAvatar = req.file.path.split('\\').splice(1).join('/');

    db.get('users').push({ id: reqId, name: reqName, phone: reqPhone, email: reqEmail, password: safePassword, avatar: reqAvatar}).write();
    res.redirect('/users');
}

