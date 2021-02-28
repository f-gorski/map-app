const devPlansSchema = require('../models/devPlans-model')

getDevPlans = async (req, res) => {
    await devPlansSchema.find({}, (err, devPlans) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!devPlans.length) {
            return res
                .status(404)
                .json({ success: false, error: `Develompent Plans not found` })
        }
        return res.status(200).json({ devPlans })
    }).catch(err => console.log(err))
}

module.exports = {
    getDevPlans
}