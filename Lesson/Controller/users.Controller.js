const shortid = require('shortid');
var md5 = require('md5');

var User = require('../models/users.model');

module.exports.index = async (req, res) => {

    var user = await User.findOne(({_id: req.signedCookies.userID}))

    if (user.status === true){
        console.log("Chao Admin!")
        User.find().then((user) => {
            res.render('users/index', {
                users: user
            })
         })
    }else{
        res.redirect('/')
    }
}


module.exports.delete = (req, res) => {
    var idCheck = req.params.id;

    User.findOneAndRemove({_id: idCheck}, (err) => {
        if (err){
            console.log(err);
            return
        }
        return res.status(200).send()
    });
    res.redirect('/users');
}

module.exports.search = async (req, res) => {

    var q = req.query.q.toUpperCase();

    var arrLowdb = await User.find();

    var matchUsers = [];

    for (var i = 0; i < arrLowdb.length; i++){
        if (arrLowdb[i].fullname.toUpperCase().indexOf(q) > -1){
            matchUsers.push(arrLowdb[i]);
        }
    }

    console.log(matchUsers)

    
    res.render('users/index', {
        users: matchUsers
    })

}

module.exports.create = async (req, res) => {
    res.render('users/create');
}

module.exports.views = async (req, res) => {
    // var idViews = req.params.id;

    // var user = await User.find({_id: idViews})

    // console.log(user)

    // res.render('users/views', {
    //     users: user
    // });
    // var idViews = req.params.id;

    // var user = await User.find({_id: idViews})

    // console.log(user.name)

    User.findById(req.params.id, (err, user) => {
        res.render('users/views', {
            users: user
        });
    })

}

module.exports.createUser = (req, res) => {
    
    var reqName = req.body.name;
    console.log(reqName)
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

    // var reqAvatar = req.file.path.split('\\').splice(1).join('/');

    var createObject = {
        fullname: reqName,
        phone: reqPhone,
        email: reqEmail,
        password: safePassword,
        status: req.body.status,
        cart: []
        // avatar: reqAvatar
    }

    User.insertMany(createObject)

    res.redirect('/users');
}

module.exports.update = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        res.render('users/update', {
            users: user
        })
    })
}

module.exports.updateUser = (req, res) => {

    var query = {_id: req.params.id}

    console.log(query)

    let users = {}

    users.fullname = req.body.name
    users.phone = req.body.phone
    users.email = req.body.email
    users.password = md5(req.body.password)

    console.log(users)

    User.update(query, users, (err) => {
        if (err){
            console.log(err)
        }else{
            res.redirect('/users')
        }
    })

}

