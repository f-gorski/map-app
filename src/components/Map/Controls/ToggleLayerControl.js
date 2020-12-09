import React, { useContext, useEffect } from 'react';
import LayerSwitcher from 'ol-layerswitcher';
import MapContext from '../MapContext';

const ToggleLayerControl = () => {
    const { map } = useContext(MapContext);
    console.log(map)

    useEffect(() => {
        if (!map) {
            return;
        }
        let toggleControl = new LayerSwitcher({activationMode: "click", startActive: true});
        map.controls.push(toggleControl);

        return () => {
            map.controls.remove(toggleControl);
        }
    }, [map])

    return null;
}

export default ToggleLayerControl;