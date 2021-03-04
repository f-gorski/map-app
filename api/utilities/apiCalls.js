//This file provides utility functions for API calls to fetch data from external API servers and store it in the database

const fetch = require('node-fetch')
const devPlansSchema = require('../models/devPlans-model')
const terrFuncSingleSchema = require('../models/terrFuncSingle-model')
const terrFuncMultiSchema = require('../models/terrFuncMulti-model')
const terrFuncMixedSchema = require('../models/terrFuncMixed-model')
const db = require('../db')

const devPlansFetch = () => {fetch("http://mapa.um.warszawa.pl/WebServices/ZasiegiPlanow/wgs84/findAll")
.then(res => res.json())
.then(data => {
    const geoJSON = new devPlansSchema(data)

    db.collection('devPlans').insertOne(geoJSON)
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

    const newFeatures = data.features.map((feature) => {

        const coordinates = feature.geometry.coordinates[0].map((coordArray) => {
            if(coordArray.length === 2) {
                return coordArray
            } else {
                const [e1, e2, e3, e4] = coordArray;
                return [parseFloat(e1 + '.' + e2), parseFloat(e3 + '.' + e4)]
            }

        })

         return{
            ...feature,
            "geometry": {
                ...feature.geometry,
                "coordinates": [coordinates]
            }};
        })

    const filteredPolygons = newFeatures.filter((polygon) => {
        return polygon.geometry.coordinates[0].some((coordLatLong) => {
            return (
                
                coordLatLong[0] < 20.9899838947136
            )
        })
    });

    data.features = filteredPolygons;

    //filter fetched data for different building types
    const singleFiltered = data.features.filter((element) => {
        return /^zabudowa jednorodzinna/.test(element.properties.fun_nazwa);
    });

    const multiFiltered = data.features.filter((element) => {
        return /^zabudowa wielorodzinna/.test(element.properties.fun_nazwa);
    });

    const mixedFiltered = data.features.filter((element) => {
        return /^zabudowa jedno i wielorodzinna/.test(element.properties.fun_nazwa);
    });

    //GeoJSON format template for feature collections
    const geoJSONTemplate = {
        "type": "FeatureCollection",
    }

    //Create new vaild GeoJSON feature collections with filtered polygons
    const single = {
        ...geoJSONTemplate,
        "features": singleFiltered
    }
    const multi = {
        ...geoJSONTemplate,
        "features": multiFiltered
    }
    const mixed = {
        ...geoJSONTemplate,
        "features": mixedFiltered
    }

    const singleGeoJSON = new terrFuncSingleSchema(single)

    db.collection('terrFuncSingle').insertOne(singleGeoJSON)
    .then(() => {
        return console.log("Success")
        
    })
    .catch(error => {
        return console.log(error)
    })

    const multiGeoJSON = new terrFuncMultiSchema(multi)
    db.collection('terrFuncMulti').insertOne(multiGeoJSON)
    .then(() => {
        return console.log("Success")
        
    })
    .catch(error => {
        return console.log(error)
    })

    const mixedGeoJSON = new terrFuncMixedSchema(mixed)
    db.collection('terrFuncMixed').insertOne(mixedGeoJSON)
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