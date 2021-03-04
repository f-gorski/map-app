const express = require('express')

const devPlansController = require('../controllers/devPlans-controller')
const terrFuncSingleController = require('../controllers/terrFuncSingle-controller')
const terrFuncMultiController = require('../controllers/terrFuncMulti-controller')
const terrFuncMixedController = require('../controllers/terrFuncMixed-controller')

const router = express.Router()

router.get('/devPlans', devPlansController.getDevPlans)
router.get('/terrFuncSingle', terrFuncSingleController.getTerrFuncSingle)
router.get('/terrFuncMixed', terrFuncMixedController.getTerrFuncMixed)
router.get('/terrFuncMulti', terrFuncMultiController.getTerrFuncMulti)

module.exports = router