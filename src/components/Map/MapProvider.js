import React, { useState, useEffect, useRef } from 'react';
import * as OL from 'ol';
import MapContext from './MapContext';

const MapProvider = ({ children, zoom, center }) => {
    const mapRef = useRef();
    const [map, setMap] = useState(null);

    //Mount map
    useEffect(() => {
        let options = {
            view: new OL.View({ zoom, center }),
            layers: [],
            controls: [],
            overlays: [],
        };
        let mapObject = new OL.Map(options);
        mapObject.setTarget(mapRef.current);
        setMap(mapObject);

        //Erase map when component unmounts
        return () => mapObject.setTarget(undefined)
    }, []);

    //Handle zoom changes
    useEffect(() => {
        if (!map) {
            return;
        }
        map.getView().setZoom(zoom)
    }, [zoom])

    //Hadle center changes
    useEffect(() => {
        if (!map) {
            return;
        }
        map.getView().setCenter(center);
    }, [center]);

    return (
        <MapContext.Provider value={{ map }}>
            <div ref={mapRef} className="map">
                {children}
            </div>
        </MapContext.Provider>
    )
}

export default MapProvider;