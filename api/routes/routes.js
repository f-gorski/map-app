const express = require('express')

const controller = require('../controllers/controller')

const router = express.Router()

router.get('/polygons', controller.getPolygons)

module.exports = router