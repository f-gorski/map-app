const terrFuncSingleSchema = require('../models/terrFuncSingle-model')

getTerrFuncSingle = async (req, res) => {
    await terrFuncSingleSchema.find({}, (err, terrFuncSingle) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!terrFuncSingle.length) {
            console.log(terrFuncSingle)
            return res
                .status(404)
                .json({ success: false, error: `Terrain Functions - Single not found` })
        }
        return res.status(200).json({ terrFuncSingle })
    }).catch(err => console.log(err))
}

module.exports = {
    getTerrFuncSingle
}