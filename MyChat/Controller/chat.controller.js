var db = require('../db');

module.exports.index = (req, res) => {
    var reqChat = req.body.messenger;

    db.get('users').push({messenger: reqChat}).write();

    // console.log(db.get('users').value().length);

    var arrTemp = [];
    for (var i = 0; i < db.get('users').value().length; i++){
        arrTemp.push(db.get('users').value()[i]);
    }

    // console.log(arrTemp);

    var showMessenger = [];
    for (var i = 0; i < arrTemp.length; i++){
        var mess = arrTemp[i].messenger;
        // console.log(mess);
        showMessenger.push(mess)
    }


    // console.log(showMessenger);

    res.render('index', {
        messengers: showMessenger
    })
};