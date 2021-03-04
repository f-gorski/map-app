const terrFuncMultiSchema = require('../models/terrFuncMulti-model')

getTerrFuncMulti = async (req, res) => {
    await terrFuncMultiSchema.find({}, (err, terrFuncMulti) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!terrFuncMulti.length) {
            return res
                .status(404)
                .json({ success: false, error: `Terrain Functions - Multi not found` })
        }
        return res.status(200).json({ terrFuncMulti })
    }).catch(err => console.log(err))
}

module.exports = {
    getTerrFuncMulti
}