const mongoose = require('mongoose')
const TestTypeThree = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    testtype: {
        type: Number,
        default: 2
    },
    chapter: {
        type: Decimal128,
        required: true
    },
    header: {
        type: String,
        required: true
    },
    testtype: {
        type: Number,
        default: 3
    },
    questions: [
        {
            question: {
                index: {
                    type: Number,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                answerIndex: {
                    type: String,
                    required: true
                }
            }
        }
    ], 
    answers: [
        {
            answer: {
                index: {
                    type: String,
                    required: true
                },
                name: {
                    type: String,
                    required: true
                }
            }   
        }
    ]
    
})

module.exports = TestTypeThree = mongoose.model('test', TestTypeThree)