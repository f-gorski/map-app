const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
const polygonRouter = require('./routes/routes')

const polygonSchema = require('./models/polygon-model')

const fetch = require('node-fetch')

const app = express();
const apiPort = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api', polygonRouter)

fetch("http://mapa.um.warszawa.pl/WebServices/ZasiegiPlanow/wgs84/findAll")
.then(res => res.json())
.then(data => {
    const geoJSON = new polygonSchema(data)

    geoJSON
        .save()
        .then(() => {
            return console.log("Success")
            
        })
        .catch(error => {
            return console.log(error)
        })
});

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))
