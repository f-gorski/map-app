const express = require('express')

const devPlansController = require('../controllers/devPlans-controller')
const terrFuncController = require('../controllers/terrFunc-controller')

const router = express.Router()

router.get('/devPlans', devPlansController.getDevPlans)
router.get('/terrFunc', terrFuncController.getTerrFunc)

module.exports = router