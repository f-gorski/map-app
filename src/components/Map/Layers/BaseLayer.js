import { useContext, useEffect } from 'react';
import MapContext from '../MapContext';
import TileLayer from 'ol/layer/Tile';

const BaseLayer = ({ source, zIndex = 0 }) => {
    const { map } = useContext(MapContext);

    //Mount base tile layer
    useEffect(() => {
        if (!map) {
            return;
        }

        let tileLayer = new TileLayer({
            source,
            zIndex,
        });
        map.addLayer(tileLayer);
        tileLayer.setZIndex(zIndex);

        return () => {
            if (map) {
                map.removeLayer(tileLayer);
            }
        }
    }, [map])

    return null;
}

export default BaseLayer;
