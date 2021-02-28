//This file provides utility functions for API calls to fetch data from external API servers and store it in the database

const fetch = require('node-fetch')
const devPlansSchema = require('../models/devPlans-model')
const terrFuncSchema = require('../models/terrFunc-model')

const devPlansFetch = () => {fetch("http://mapa.um.warszawa.pl/WebServices/ZasiegiPlanow/wgs84/findAll")
.then(res => res.json())
.then(data => {
    const geoJSON = new devPlansSchema(data)

    geoJSON
        .save()
        .then(() => {
            return console.log("Success")
            
        })
        .catch(error => {
            return console.log(error)
        })
})};

const terrFuncFetch = () => {fetch("http://mapa.um.warszawa.pl/WebServices/PrzeznaczenieTerenow/wgs84/findByFunName/zabudowa")
.then(res => res.json())
.then(data => {
    const geoJSON = new terrFuncSchema(data)

    geoJSON
        .save()
        .then(() => {
            return console.log("Success")
            
        })
        .catch(error => {
            return console.log(error)
        })
})};

module.exports = {
    devPlansFetch,
    terrFuncFetch
}