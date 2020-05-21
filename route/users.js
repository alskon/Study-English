const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../model/User')
const Statistics = require('../model/Statistics')
const Unit = require('../model/Unit')
const TestTypeOne = require('../model/Test_type_1')

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Enter valid email').isEmail(),
    check('password', 'MIN length 6 characters').isLength({ min:6 })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    } 
    const { name, email, password } = req.body
    try {
        let user = await User.findOne({email: email})
        if (user) {
            return res.status(401).json({ errors: [{msg: 'User already exist'}] })
        }
        user = new User({
            name,
            email, 
            password
        })
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        await user.save()
        
        const userId = user.id 
        const stats = new Statistics({
            user: userId,
            units:[]
        })
        const unitStat = []
        const allUnits = await Unit.find({  }).select('number')
            .then(units => units.map(item => item.number))
            .then(arr => arr.sort((a, b) => a - b))     

        const allTests = await TestTypeOne.find({  }).select('unit chapter questions')   
        allUnits.map(unit => {
            unitStat.push({
                unitNumber: unit,
                tests: []
            })
        })
        unitStat.map(unit => {
            allTests.map(test => test.unit === unit.unitNumber ? unit.tests.push({
                testChapter: test.chapter,
                questions: test.questions.map(question => ({
                    questionId: question._id,
                    questionName: question.question,
                    rightAnswer: false,
                    countWrongAnswer: 0
                }))
                                
            }) : '')
            unit.tests.sort((a, b) => a.testChapter.split('.')[1] - b.testChapter.split('.')[1])
        })        

        stats.units = unitStat
        
        await stats.save()
        const payload = {
            user: {
                id: user.id,
                admin: user.admin
            }
        }
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 7200 },
            (err, token) => {
                if (err) throw err
                res.json({ token })
            }
        )
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')        
    }
})

//Delete user
//Private
router.delete('/', auth, async (req, res) => {
    try {
        await User.deleteOne({ _id: req.user.id })
        await Statistics.deleteOne({ user: req.user.id })
        res.json({ msg: 'User deleted' })
    } catch (err) {
        res.status(500).send('Server error')
    }
})

module.exports = router