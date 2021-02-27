const mongoose = require('mongoose')
const Schema = mongoose.Schema

const polygonSchema = new Schema({
    type: { 
        type: String, 
        required: true
    },
    features: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('polygon', polygonSchema);