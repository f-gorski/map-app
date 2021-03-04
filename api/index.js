const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const polygonRouter = require('./routes/routes')
const apiCalls = require('./utilities/apiCalls')

const app = express();
const apiPort = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

app.use('/api', polygonRouter)
app.get('/', (req,res) => {res.send('API working')})

// apiCalls.devPlansFetch()
// apiCalls.terrFuncFetch()

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
