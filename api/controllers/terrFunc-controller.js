const terrFuncSchema = require('../models/terrFunc-model')

getTerrFunc = async (req, res) => {
    await terrFuncSchema.find({}, (err, terrFunc) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!terrFunc.length) {
            return res
                .status(404)
                .json({ success: false, error: `Terrain Functions not found` })
        }
        return res.status(200).json({ terrFunc })
    }).catch(err => console.log(err))
}

module.exports = {
    getTerrFunc
}