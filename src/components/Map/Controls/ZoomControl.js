import React, { useContext, useEffect } from 'react';
import Zoom from 'ol/control/Zoom';
import MapContext from '../MapContext';

const ZoomControl = () => {
    const { map } = useContext(MapContext);
    console.log(map)

    useEffect(() => {
        if (!map) {
            return;
        }
        let zoomControl = new Zoom();
        map.controls.push(zoomControl);

        return () => {
            map.controls.remove(zoomControl);
        }
    }, [map])

    return null;
}

export default ZoomControl;