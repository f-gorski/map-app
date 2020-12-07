import React, { useState, useEffect } from 'react';
import MapProvider from './MapProvider';
import Layers from './Layers/Layers';
import BaseLayer from './Layers/BaseLayer';
import VectorLayer from './Layers/VectorLayer';

import styles from './Layers/layerStyles';
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import osm from './Source/osm';
import vector from './Source/vector';
import Controls from './Controls/Controls';
import ZoomControl from './Controls/ZoomControl';
import ToggleLayerControl from './Controls/ToggleLayerControl';

const Map = () => {
    const [center, setCenter] = useState([21.00412, 52.23235]);
    const [zoom, setZoom] = useState(13);
    const [geoJSONData, setGeoJSONData] = useState(null);
    const [showLayer, setShowLayer] = useState(true);

    useEffect(() => {
        fetch("https://cors-anywhere.herokuapp.com/mapa.um.warszawa.pl/WebServices/ZasiegiPlanow/wgs84/findAll/")
        .then(res => res.json())
        .then(data => setGeoJSONData(data));
    })

    return (
        <MapProvider center={fromLonLat(center)} zoom={zoom}>
            <Layers>
                <BaseLayer source={osm()} zIndex={0} />

                {geoJSONData && <VectorLayer
                    source={vector({ features: new GeoJSON().readFeatures(geoJSONData, { featureProjection: get('EPSG:3857') }) })}
                    style={styles.MultiPolygon} />}

            </Layers>
            <Controls>
                <ZoomControl />
                <ToggleLayerControl />
            </Controls>
        </MapProvider>
    )
}

export default Map;