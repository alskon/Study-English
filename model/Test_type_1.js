const mongoose = require('mongoose')
const TestTypeOneSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    testtype: {
        type: Number,
        default: 1
    },
    header: {
        type: String,
        required: true
    },

    chapter: {
        type: String,
        unique: true,
        required: true
    },
    unit: {
        type: Number,
        required: true
    },
    unitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'unit'
    },
    variation: [{
        type: String,
    }],
    questions: [
        {
            question: {
                type: String,
                required: true
            },
            answer: [
                {
                    type: String
                }
            ]
        }],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = TestTypeOne = mongoose.model('test_type_one', TestTypeOneSchema)