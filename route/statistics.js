const express = require('express')
const router = express.Router()
const Statistics = require('../model/Statistics')
const auth = require('../middleware/auth')

//GET Statistics
//Private
router.get('/', auth, async (req, res) => {
    try {
        const statistics = await Statistics.findOne({ user: req.user.id })
        if(!statistics) {
            return res.status(401).json('User not found')
        }
        res.json(statistics)
    } catch (err) {
        res.status(500).send('Server error')
    }    
})

//PUT rightAnswer - true
//Private
router.put('/right-answer/:unitNumber/:testChapter/:questionId', auth, async (req, res) => {
    try {
        const statistics = await Statistics.findOne({ user: req.user.id })
        const unit = statistics.units
            .find(unit => unit.unitNumber.toString() === req.params.unitNumber)
        const test = unit.tests
            .find(test => test.testChapter === req.params.testChapter)
        const question = test.questions
            .find(question => question.questionId.toString() === req.params.questionId)
        if(!question) {
            res.status(401).json({ msg: "Question not found" })
        }
        question.rightAnswer = true
        await statistics.save()
        res.json(statistics)
    } catch (err) {
        res.status(500).send('Server error')        
    }
})

//PUT countWrongNumber ++
//Private
router.put('/wrong-answer/:unitNumber/:testChapter/:questionId', auth, async (req, res) => {
    try {
        const statistics = await Statistics.findOne({ user: req.user.id })
        const unit = statistics.units
            .find(unit => unit.unitNumber.toString() === req.params.unitNumber)
        const test = unit.tests
            .find(test => test.testChapter === req.params.testChapter)
        const question = test.questions
            .find(question => question.questionId.toString() === req.params.questionId)
        if(!question) {
            res.status(401).json({ msg: "Question not found" })
        }
        if(!question.rightAnswer) question.countWrongAnswer ++
        await statistics.save()
        res.json(question)
    } catch (err) {
        res.status(500).send('Server error')
    }
})
module.exports = router
