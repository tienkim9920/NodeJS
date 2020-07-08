var db = require('../db');

module.exports.index = (req, res) => {

    var page = parseInt(req.query.page) || 1;
    var coutProduct = 4;

    var start = (page - 1) * coutProduct;
    var end = page * coutProduct;


    var arrProduct = [];

    for (var i = start; i < end; i++){
        arrProduct.push(db.get('users').value()[i]);
    }

    var sessionId = req.signedCookies.sessionId;
    
    var idSession = db.get('sessionId').find(({id}) => id === sessionId).get('cart').value();

    var arrCart = [];
    for (let x in idSession){
        arrCart.push(x)
    }

    console.log(arrCart);

    var sum = 0;
    for (var i = 0; i < arrCart.length; i++){
        var count = db.get('sessionId').find(({id}) => id === sessionId).get('cart.' + arrCart[i]).value();
        sum += count;
    }

    res.render('products/index', {
        products: arrProduct,
        countCart: sum
    })
}