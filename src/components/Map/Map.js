import React, { useState, useEffect } from 'react';
import MapProvider from './MapProvider';
import Layers from './Layers/Layers';
import BaseLayer from './Layers/BaseLayer';
import VectorLayer from './Layers/VectorLayer';
import Popups from './Layers/Popups/Popups';
import { fetchDevPlans, fetchDevTypes } from '../../utilities/apiCalls';

import styles from './Layers/layerStyles';
import { get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import osm from './Source/osm';
import vector from './Source/vector';
import Controls from './Controls/Controls';
import ZoomControl from './Controls/ZoomControl';
import ToggleLayerControl from './Controls/LayerSwitcher';
import LayerSwitcher from './Controls/LayerSwitcher';

const Map = () => {
    const [center, setCenter] = useState([2338380.678557, 6842117.267520]);
    const [zoom, setZoom] = useState(13);

    const [devPlansData, setDevPlansData] = useState(null);
    const [singleData, setSingleData] = useState(null);
    const [multiData, setMultiData] = useState(null);
    const [mixedData, setMixedData] = useState(null);

    const [showLayerDevPlans, setShowLayerDevPlans] = useState(false);
    const [showLayerSingle, setShowLayerSingle] = useState(false);
    const [showLayerMixed, setShowLayerMixed] = useState(false);
    const [showLayerMulti, setShowLayerMulti] = useState(false);

    useEffect(() => {
        fetchDevPlans(setDevPlansData);
        fetchDevTypes(setSingleData, setMultiData, setMixedData);
    }, []);

    return (
        <>
            <MapProvider center={center} zoom={zoom} setCenter={setCenter}>
                <Layers>
                    <BaseLayer source={osm()} zIndex={0} />

                    {devPlansData && showLayerDevPlans ?
                        <VectorLayer
                            source={vector({ features: new GeoJSON().readFeatures(devPlansData, { featureProjection: get('EPSG:3857') }) })}
                            style={styles.DevPlansPolygon} name="devPlans" /> :
                        null}

                    {singleData && showLayerSingle ? 
                        <VectorLayer
                            source={vector({ features: new GeoJSON().readFeatures(singleData, { featureProjection: get('EPSG:3857') }) })}
                            style={styles.SinglePolygon} name="singleData" /> :
                        null}

                    {multiData && showLayerMulti ? 
                        <VectorLayer
                            source={vector({ features: new GeoJSON().readFeatures(multiData, { featureProjection: get('EPSG:3857') }) })}
                            style={styles.MultiPolygon} name="multiData" /> :
                        null}

                    {mixedData && showLayerMixed ? 
                        <VectorLayer
                            source={vector({ features: new GeoJSON().readFeatures(mixedData, { featureProjection: get('EPSG:3857') }) })}
                            style={styles.MixedPolygon} name="mixedData" /> :
                        null}

                </Layers>
                
                <Popups />
                <Controls>
                    <ZoomControl />
                    <ToggleLayerControl />
                </Controls>
            </MapProvider>

            <LayerSwitcher 
                devPlansData={devPlansData} setShowLayerDevPlans={setShowLayerDevPlans} singleData={singleData} setShowLayerSingle={setShowLayerSingle} 
                multiData={multiData} setShowLayerMulti={setShowLayerMulti}
                mixedData={mixedData} setShowLayerMixed={setShowLayerMixed}  
                />
        </>
    )
}

export default Map;