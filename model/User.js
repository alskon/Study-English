const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default:Date.now
    },
    admin: {
        type: Boolean,
        default: false
    }    
})

module.exports = User = mongoose.model('User', UserSchema)