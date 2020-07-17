
var Product = require('../models/products.model')
var User = require('../models/users.model')
var Cart = require('../models/carts.model')

module.exports.index = async (req, res) => {

    var user = await User.findOne({_id: req.signedCookies.userID})

    var userID = {_id: req.signedCookies.userID}
    console.log(userID)

    var cartItems = await Cart.find({idUser: userID})

    var soLuong = 0;

    for (var i = 0; i < cartItems.length; i++){
        soLuong += cartItems[i].count
    }

    console.log(soLuong)

    Product.find().then((product) => {
        res.render('BuyProduct', {
            products: product,
            users: user,
            countProduct: soLuong,
        })
    })

}

module.exports.viewProduct = async (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        res.render('BuyProduct/views', {
            products: product
        })
    })
}

module.exports.addCart = async (req, res) => {
    
    var userID = {_id: req.signedCookies.userID}
    console.log(userID)

    var cartItems = await Cart.find({idUser: userID})
    console.log(cartItems)

    var product = await Product.findOne({_id: req.params.id})

    if (cartItems.length > 0){
        let flag = false

        var soLuong;
        var query;

        for (var i = 0; i < cartItems.length; i++){
            if (cartItems[i].idProduct === req.params.id){
                query = cartItems[i]._id
                flag = true
                console.log(flag)
                cartItems[i].count++
                soLuong = cartItems[i].count
            }
        }

        if (flag){

            console.log(cartItems)

            console.log(soLuong)

            console.log(query)

            Cart.findByIdAndUpdate(query, { count: soLuong }, (err) => {
                if (err){
                    console.log(err);
                    return
                }
                return res.status(200).send()
            })

            res.redirect('/BuyProduct')
        }
        if(!flag){
            let cart = {}

            cart.idUser = userID
            cart.idProduct = product._id
            cart.name = product.name
            cart.price = product.price
            cart.status = product.status
            cart.img = product.img
            cart.count = product.count

            Cart.insertMany(cart, (err) => {
                if (err){
                    console.log(err)
                }else{
                    res.redirect('/BuyProduct')
                }
            })
        }
    }else{

        let cart = {}

        cart.idUser = userID
        cart.idProduct = product._id
        cart.name = product.name
        cart.price = product.price
        cart.status = product.status
        cart.img = product.img
        cart.count = product.count

        Cart.insertMany(cart, (err) => {
            if (err){
                console.log(err)
            }else{
                res.redirect('/BuyProduct')
            }
        })
    }
}

module.exports.shows = async (req, res) => {

    var userID = {_id: req.signedCookies.userID}

    var user = await User.findOne(userID)

    var cartItems = await Cart.find({idUser: userID})

    var soLuong = 0;

    for (var i = 0; i < cartItems.length; i++){
        soLuong += cartItems[i].count
    }

    Cart.find().then((cart) => {
        res.render('BuyProduct/shows', {
            carts: cart,
            users: user,
            listCarts: cartItems, 
            countProduct: soLuong
        })
    })
}

module.exports.deleteProduct = async (req, res) => {

    var idSanPham = req.params.id
    console.log(idSanPham)

    Cart.findOneAndRemove({_id: idSanPham}, (err) => {
        if (err){
            console.log(err);
            return
        }
        return res.status(200).send()
    })

    res.redirect('/BuyProduct')
}

module.exports.search = async (req, res) => {
    var txtSearch = req.query.q.toUpperCase()

    var findProduct = await Product.find()

    var userID = {_id: req.signedCookies.userID}

    var user = await User.findOne({_id: userID})

    var arrayCarts = []

    for (var i = 0; i < findProduct.length; i++){
        if (findProduct[i].name.toUpperCase().indexOf(txtSearch) !== -1){
            arrayCarts.push(findProduct[i])
        }
    }

    var cartItems = await Cart.find({idUser: userID})

    var soLuong = 0;

    for (var i = 0; i < cartItems.length; i++){
        soLuong += cartItems[i].count
    }
    
    res.render('BuyProduct/index', {
        products: arrayCarts,
        users: user, 
        countProduct: soLuong
    })

}