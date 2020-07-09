
var User = require('../models/users.model')



module.exports.index = async (req, res) => {
    User.find().then((user) => {
        res.render('BuyProduct', {
            users: user
        })
    })
}

module.exports.viewProduct = async (req, res) => {

    // var idViews = req.params.id

    // var user = await User.find({_id: idViews})

    User.findById(req.params.id, (err, user) => {
        res.render('BuyProduct/views', {
            users: user
        })
    })
}