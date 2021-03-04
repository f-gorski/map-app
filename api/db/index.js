const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://map-app:getN7i9Z7Ktgm4F7@cluster0.yd5of.mongodb.net/?retryWrites=true', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db