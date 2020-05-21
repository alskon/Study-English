const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../middleware/auth')
const Unit = require('../model/Unit')
const Test_type_one = require('../model/Test_type_1')
const Statistics = require('../model/Statistics')

//Get all Units
//Private
router.get('/', auth, async (req, res) => {
    try {
        const units = await Unit.find().sort('number').select('number name header test')
        res.json(units)
    } catch (err) {
        res.status(500).send('Server error')
    }
})

//Add Unit
//Private Admin
router.post('/add-unit', 
    [auth, [
        check('number', 'Unit\'s number is reqired').not().isEmpty(),
        check('header', 'Unit\'s header is reqired').not().isEmpty()
        ]
    ], async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array() })
        }
        const { number, header } = req.body
        const newUnit = {
            user: req.user.id,
            number,
            name: `Unit ${number}`,
            header: header.charAt(0).toUpperCase()+header.slice(1)
        }
        try {
            if (!req.user.admin) {
                return res.status(403).json({ msg: 'Forbidden' })
            }
            let unit = await Unit.findOne({ number: number })
            if(unit) {
                return res.status(401).json({ errors: [{msg: 'Unit already exist'}] })
            }
            unit = new Unit (newUnit)
            await unit.save()
            const unitStat = {
                unitNumber: number,
                tests: []
            }
            await Statistics.updateMany({  }, { $push: { units: unitStat } })
            res.json(unit)

        } catch (err) {
            res.status(500).send('Server error')
        }
    })
    router.delete('/:unit_number', auth, async (req, res) => {

        try {
            if(!req.user.admin) {
                return res.status(403).json({ msg: 'Forbidden' })
            }
            let unit = await Unit.findOne({ number: req.params.unit_number })
            if (!unit) {
                res.status(401).json({ errors: [{msg: 'Unit not found'}] })
            }

            const unitStat = await Statistics.find({  })
            unitStat.map(async stat => {
                const index = stat.units.findIndex(unit => unit.unitNumber.toString() === req.params.unit_number)
                index !== -1 ? stat.units.splice(index, 1) : ''
                await stat.save()
                }            
            )

            await Unit.deleteOne({ number: req.params.unit_number })
            await Test_type_one.deleteMany ({ unit: req.params.unit_number })
            
            res.json({ msg: 'Unit deleted' })
        } catch (err) {
            console.log(err)
            res.status(500).send('Server error')
        }
    })

module.exports = router