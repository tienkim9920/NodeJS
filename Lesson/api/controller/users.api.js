
var User = require('../../models/users.model')

module.exports.index = async (req, res) => {
    
    var users = await User.find()

    res.json(users)
}