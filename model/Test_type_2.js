const mongoose = require('mongoose')
const TestTypeTwoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    testtype: {
        type: Number,
        default: 2
    },
    chapter: {
        type: Number,
        required: true
    },
    header: {
        type: String,
        required: true
    },
    testtype: {
        type: Number,
        default: 2
    },
    questions: [{
        question: {
            type: String,
            required: true
        },
        answer: {
            type: String,
            required: true
        }
    }]
})

module.exports = TestTypeTwo = mongoose.model('test_type_two', TestTypeTwoSchema)