const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    userName : String,
    userPassword : String,
    userEmail : String,
    userPhone : String,
    userRegisteredAt : {type : Date, default : Date.now()}
})

const usersModel = mongoose.model('User',usersSchema)

module.exports = usersModel