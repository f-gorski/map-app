import React, { useState, useEffect } from 'react';
import MapProvider from './MapProvider';
import Layers from './Layers/Layers';
import BaseLayer from './Layers/BaseLayer';
import VectorLayer from './Layers/VectorLayer';
import { fetchDevPlans, fetchDevTypes } from '../../utilities/apiCalls';

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
    const [devPlansData, setDevPlansData] = useState(null);
    const [singleData, setSingleData] = useState(null);
    const [multiData, setMultiData] = useState(null);
    const [mixedData, setMixedData] = useState(null);

    const [showLayer, setShowLayer] = useState(true);

    useEffect(() => {
        fetchDevPlans(setDevPlansData);
        fetchDevTypes(setSingleData, setMultiData, setMixedData);
    }, []);

    return (
        <MapProvider center={fromLonLat(center)} zoom={zoom}>
            <Layers>
                <BaseLayer source={osm()} zIndex={0} />

                {devPlansData && <VectorLayer
                    source={vector({ features: new GeoJSON().readFeatures(devPlansData, { featureProjection: get('EPSG:3857') }) })}
                    style={styles.DevPlansPolygon} />}

                {singleData && <VectorLayer
                    source={vector({ features: new GeoJSON().readFeatures(singleData, { featureProjection: get('EPSG:3857') }) })}
                    style={styles.SinglePolygon} />}

                {multiData && <VectorLayer
                    source={vector({ features: new GeoJSON().readFeatures(multiData, { featureProjection: get('EPSG:3857') }) })}
                    style={styles.MultiPolygon} />}

                {mixedData && <VectorLayer
                    source={vector({ features: new GeoJSON().readFeatures(mixedData, { featureProjection: get('EPSG:3857') }) })}
                    style={styles.MixedPolygon} />}

            </Layers>
            <Controls>
                <ZoomControl />
                <ToggleLayerControl />
            </Controls>
        </MapProvider>
    )
}

export default Map;