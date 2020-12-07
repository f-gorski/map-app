import { Fill, Stroke, Style } from 'ol/style';

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

export default styles;