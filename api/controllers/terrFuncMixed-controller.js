const terrFuncMixedSchema = require('../models/terrFuncMixed-model')

getTerrFuncMixed = async (req, res) => {
    await terrFuncMixedSchema.find({}, (err, terrFuncMixed) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!terrFuncMixed.length) {
            return res
                .status(404)
                .json({ success: false, error: `Terrain Functions - Mixed not found` })
        }
        return res.status(200).json({ terrFuncMixed })
    }).catch(err => console.log(err))
}

module.exports = {
    getTerrFuncMixed
}