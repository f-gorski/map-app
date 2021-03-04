const mongoose = require('mongoose')
const Schema = mongoose.Schema

const terrFuncSingleSchema = new Schema({
    type: { 
        type: String, 
        required: true
    },
    features: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('terrFuncSingle', terrFuncSingleSchema, 'terrFuncSingle');