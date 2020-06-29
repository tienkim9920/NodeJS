
var db = require('../db');

module.exports.addCart = (req, res, next) => {
    var productId = req.params.id;
    var sessionId = req.signedCookies.sessionId

    if (!sessionId){
        res.redirect('/products');
        return;
    }

    var count = db.get('sessionId').find(({id}) => id === sessionId).get('cart.' + productId, 0).value();

    db.get('sessionId')
        .find(({id}) => id === sessionId)
        .set('cart.' + productId, count + 1)
        .write()


    res.redirect('/products');
}