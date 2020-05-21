const mongoose = require('mongoose')

const UnitSchema = mongoose.Schema({
    number : {
        type: Number,
        unique: true,
        isRequired: true
    },
    name: {
        type: String,
        isRequired: true
    },
    test: [
        {
            type: String
        }
    ],
    header: {
        type: String,
        isRequired: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = Unit = mongoose.model('unit', UnitSchema)