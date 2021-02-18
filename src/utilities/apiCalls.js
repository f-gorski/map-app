const fetchDevPlans = (setStateHookDevPlans) => fetch("https://cors-anywhere.herokuapp.com/mapa.um.warszawa.pl/WebServices/ZasiegiPlanow/wgs84/findAll/")
    .then(res => res.json())
    .then(data => setStateHookDevPlans(data));

const fetchDevTypes = (setStateHookSingle, setStateHookMulti, setStateHookMixed) => fetch("https://cors-anywhere.herokuapp.com/http://mapa.um.warszawa.pl/WebServices/PrzeznaczenieTerenow/wgs84/findByFunName/zabudowa")
    .then(res => res.json())
    .then(data => {

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

        setStateHookSingle(single);
        setStateHookMulti(multi);
        setStateHookMixed(mixed);

    });

export { fetchDevPlans, fetchDevTypes }