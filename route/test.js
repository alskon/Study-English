const express = require('express')
const router = express.Router()
const testTypeOne = require('../model/Test_type_1')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')
const Unit = require('../model/Unit')

//Get test
//Access Private 
router.get('/:test_chapter', auth, async (req, res) => {
    try {
        const test = await testTypeOne.findOne({ chapter: req.params.test_chapter })
        if(!test) {
            return res.status(400).json({ msg: 'Test not found' })
        }
        const testChapters = await testTypeOne.find({ unit: test.unit }).select('chapter')        
        const arrayTestChapters = testChapters.map(test => test.chapter).sort((a, b) => a.toString().split('.')[1] - b.toString().split('.')[1])
        res.json({ test, arrayTestChapters })
    } catch (err) {
        res.status(500).send('Server error')
    }
})

//Get tests
//Access Private
router.get('/all/:unit', auth, async (req, res) => {
    try {        
        const tests = await testTypeOne.find({ unit: req.params.unit }).select('chapter')
        if(!tests.length) {
            return res.status(400).json({ msg: 'No tests found' })
        }
        const chapters = tests.map(test => test.chapter).sort((a, b) => a.toString().split('.')[1] - b.toString().split('.')[1])
        res.json(chapters)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server error')
    }
})
//Add test type-1
//Access Private Admin
router.post('/unit-:unit_number', [auth, 
    [check('chapter', 'Field is required').not().isEmpty(),
    check('header', 'Header is required').not().isEmpty()]
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const {
        chapter,
        header,
        variation,
    } =req.body    
    const testFields = {}
    testFields.user = req.user.id
    testFields.header = header.charAt(0).toUpperCase()+header.slice(1)
    if (variation) testFields.variation = variation.split(',').map(item => item.trim())   
    try {   
        if (!req.user.admin) {
            return res.status(403).json({ msg: 'Forbidden' })
        }     
        let unit = await Unit.findOne({ number: req.params.unit_number })
        if(!unit) {
            return res.status(401).json({ msg: 'Unit not found' })
        }
        testFields.unit = req.params.unit_number
        testFields.unitId = unit._id
        testFields.chapter = `${req.params.unit_number}.${chapter}`

        let test = await testTypeOne.findOne({ chapter: testFields.chapter })
        if(test) {
            test = await testTypeOne.findOneAndUpdate({ chapter: testFields.chapter }, { $set: testFields }, { new: true })
            return res.json(test)
        }
        test = new testTypeOne(testFields)
        unit.test.push(testFields.chapter)
        unit.test.sort((a, b) => a.toString().split('.')[1] - b.toString().split('.')[1])
        await test.save()
        await unit.save()

        const statistics = await Statistics.find()
        statistics.map(async item => {
            const userStat = await Statistics.findOne({ user: item.user })
            userStat.units.map(unit => {
                return unit.unitNumber === Number(req.params.unit_number) ? 
                    (unit.tests.unshift({
                        testChapter: testFields.chapter,
                        questions: []
                        }),
                        unit.tests.sort((a, b) => a.testChapter.toString().split('.')[1] - b.testChapter.toString().split('.')[1])) : ''

                    })

                await userStat.save()
            })      

        res.json(test)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})
//Put question (test type-1)
//Access Private Admin
router.put('/:test_chapter/add-question', [auth, [
    check('question', 'Question is required').not().isEmpty(),
    check('answer', 'Answer is required').not().isEmpty()
        ]
    ], 
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
        const {
            question,
            answer
        } = req.body
        const questionFields = {}
        questionFields.question = question.charAt(0).toUpperCase()+question.slice(1)
        questionFields.answer = answer.split(',').map(item => item.trim()).map(item => item.charAt(0).toUpperCase()+item.slice(1))

        try {
            if (!req.user.admin) {
                return res.status(403).json({ msg: 'Forbidden' })
            } 
            const test = await testTypeOne.findOne({ chapter :req.params.test_chapter })
            if (!test) {
                return res.status(401).json({ msg: 'Test not found' })
            }

            test.questions.unshift(questionFields)
            await test.save()   
            
            const questionId = test.questions[0]._id
            const unitNumber = Math.trunc(req.params.test_chapter)
            
            const statistics = await Statistics.find()
            statistics.map(async item => {
                const userStat = await Statistics.findOne({ user: item.user })
                const unit = userStat.units.filter(unit => unit.unitNumber === unitNumber )[0]

                unit.tests.map(test => {                    
                    return test.testChapter === req.params.test_chapter ? 
                        test.questions.unshift({
                            questionId,
                            questionName: question.charAt(0).toUpperCase()+question.slice(1),
                            rightAnswer: false,
                            countWrongAnswer: 0
                            }) : ''
                })                
                await userStat.save()
            })      
            
                res.json(test)
        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server error')
            
        }
    })
//Delete question (test type-1)
//Access Private Admin
router.delete('/delete-question/:test_chapter/:question_id', auth, async (req, res) => {
    try {
        if (!req.user.admin) {
            return res.status(403).json({ msg: 'Forbidden' })
        } 
        const test = await testTypeOne.findOne({ chapter: req.params.test_chapter })
        if (!test) {
            return res.status(401).json({ msg: 'Test not found' })
        }
        if(!test.questions) {
            return res.status(401).json({ msg: 'No questions' })
        }
        const removeIndex = test.questions.map(question => question._id.toString()).indexOf(req.params.question_id)
        if(removeIndex === -1) {
            return res.status(401).json({ msg: 'No valid question'})
        }
        test.questions.splice(removeIndex, 1)

        // const unitNumber = Math.trunc(req.params.test_chapter)
        // const statistics = await Statistics.find({  })
        //     statistics.map(async stat => {
        //         const userStat = await Statistics.findOne({  })
        //         const unit = userStat.units.filter(unit => unit.unitNumber === unitNumber)[0]
   
        //         const testStat = unit.tests.find(test => test.testChapter === req.params.test_chapter)
        //         const removeIndexStat = testStat.questions.findIndex(question => question.questionId.toString() === req.params.question_id)
        //         removeIndexStat !== -1 ? testStat.questions.splice(removeIndexStat, 1) : ''                 
        //         await stat.save()
        //     })

            const statistics = await Statistics.find({  })
            statistics.map(async stat => {
                stat.units.map(unit => {
                    unit.tests.map(test => {
                        const index = test.questions.findIndex(question => question.questionId.toString() === req.params.question_id)
                        index !== -1 ? test.questions.splice(index, 1) : ''
                        })                    
                    } 
                )                
                await stat.save()
            }            
        )
 
        await test.save()
        res.json(test.questions)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
        
    }
})

//Delete test
//Access Private Admin
router.delete('/:test_chapter', auth, async (req, res) => {
    try {
        if (!req.user.admin) {
            return res.status(403).json({ msg: 'Forbidden' })
        }
        const test = await testTypeOne.findOne({ chapter: req.params.test_chapter })
        if(!test) {
            return res.status(401).json({ msg: 'Test not found' })
        }
        const unit = await Unit.findOne({ number: test.unit })
        const removeIndex = unit.test.map(testItem => testItem).indexOf(req.params.test_chapter)
        await testTypeOne.deleteOne({ chapter: req.params.test_chapter })
        unit.test.splice(removeIndex, 1)

        const unitStat = await Statistics.find({  })
            unitStat.map(async stat => {
                stat.units.map(unit => {
                    const index = unit.tests.findIndex(test => test.testChapter === req.params.test_chapter)
                    index !== -1 ? unit.tests.splice(index, 1) : ''
                    } 
                )                
                await stat.save()
            }            
        )

        await unit.save()
        res.json({ msg: 'Test deleted' })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router