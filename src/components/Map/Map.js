import React, { useState } from 'react';
import MapProvider from './MapProvider';
import Layers from './Layers/Layers';
import BaseLayer from './Layers/BaseLayer';
import VectorLayer from './Layers/VectorLayer';

import { Fill, Stroke, Style } from 'ol/style';
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import osm from './Source/osm';
import Controls from './Controls/Controls';
import ZoomControl from './Controls/ZoomControl';
import ToggleLayerControl from './Controls/ToggleLayerControl';

let styles = {
    "MultiPolygon": new Style({
        stroke: new Stroke({
            color: "blue",
            width: 1,
        }),
        fill: new Fill({
            color: "rgba(0, 0, 255, 0.1)",
        }),
    }),
}

const initialCenter = [21.00412, 52.23235];

const Map = () => {
    const [center, setCenter] = useState(initialCenter);
    const [zoom, setZoom] = useState(13);

    return (
        <MapProvider center={fromLonLat(center)} zoom={zoom}>
            <Layers>
                <BaseLayer source={osm()} zIndex={0} />
            </Layers>
            <Controls>
                <ZoomControl />
                <ToggleLayerControl />
            </Controls>
        </MapProvider>
    )
}

export default Map;