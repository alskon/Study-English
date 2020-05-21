const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const User = require('../model/User')

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')     

        res.json(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')   
    }
})

router.post('/', [
    check('email', 'Enter valid email').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: email })
        if(!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
        }
        const payload = {
            user: {
                id: user.id,
                admin: user.admin
            }
        }
        
        const admin = user.admin
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 7200 }, (err, token) => {
            if(err) throw err
            res.json({ token, admin })
        })
        
    } catch (err) {
        console.log(err.message)
        res.status(500).send('Server error')
    }
})


module.exports = router