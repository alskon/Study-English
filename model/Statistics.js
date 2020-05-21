const mongoose = require('mongoose')
const StatisticsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        unique: true
    },
    units: [
        {
            unitNumber: {
                type: Number
            },
            tests: [
                {
                    testChapter: {
                        type: String
                    },
                    questions: [
                        {                            
                                questionId: {
                                    type: mongoose.Schema.Types.ObjectId
                                },
                                questionName: {
                                    type: String
                                },
                                rightAnswer: {
                                    type: Boolean
                                },
                                countWrongAnswer: {
                                    type: Number
                                } 
                            }
                    ]
                }
            ]  
        }

    ],        
})
module.exports = Statistics = mongoose.model('Statistics', StatisticsSchema)