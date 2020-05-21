const express = require('express')
const connectDB = require('./config/database')

const auth = require('./route/auth')
const users = require('./route/users')
const test = require('./route/test')
const unit = require('./route/unit')
const statistics = require('./route/statistics')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(express.json({extended: false}))

app.use('/api/auth', auth)
app.use('/api/users', users)
app.use('/api/test', test)
app.use('/api/unit', unit)
app.use('/api/statistics', statistics)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



app.listen(PORT, () => console.log(`Server running on ${PORT}`))