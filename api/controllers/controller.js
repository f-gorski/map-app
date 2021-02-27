const polygonSchema = require('../models/polygon-model')

getPolygons = async (req, res) => {
    await polygonSchema.find({}, (err, polygon) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!polygon.length) {
            return res
                .status(404)
                .json({ success: false, error: `Polygon not found` })
        }
        return res.status(200).json({ polygon })
    }).catch(err => console.log(err))
}

module.exports = {
    getPolygons
}