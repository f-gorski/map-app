const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
const polygonRouter = require('./routes/routes')
const externalAPICalls = require('./utilities/apiCalls')

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.use('/api', polygonRouter)

externalAPICalls.devPlansFetch()
externalAPICalls.terrFuncFetch()
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
