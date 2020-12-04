import { useContext, useEffect } from 'react';
import OLVectorLayer from 'ol/layer/Vector';
import MapContext from '../MapContext';

const VectorLayer = ({ source, style, zIndex = 0 }) => {
    const { map } = useContext(MapContext);

    //Mount vector layer
    useEffect(() => {
        if (!map) {
            return;
        }

        let vectorLayer = new OLVectorLayer({
            source,
            style,
        });
        map.addLayer(vectorLayer);
        vectorLayer.setZIndex(zIndex);

        return () => {
            if (map) {
                map.removeLayer(vectorLayer);
            }
        }
    }, [map])

    return null;
}

export default VectorLayer;
