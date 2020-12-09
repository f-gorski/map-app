import { Fill, Stroke, Style } from 'ol/style';

let styles = {
    "DevPlansPolygon": new Style({
        stroke: new Stroke({
            color: "blue",
            width: 1,
        }),
        fill: new Fill({
            color: "rgba(0, 0, 255, 0.1)",
        }),
    }),
    "SinglePolygon": new Style({
        stroke: new Stroke({
            color: "red",
            width: 1,
        }),
        fill: new Fill({
            color: "rgba(100, 100, 255, 0.1)",
        }),
    }),
    "MultiPolygon": new Style({
        stroke: new Stroke({
            color: "green",
            width: 1,
        }),
        fill: new Fill({
            color: "rgba(100, 100, 255, 0.1)",
        }),
    }),
    "MixedPolygon": new Style({
        stroke: new Stroke({
            color: "purple",
            width: 1,
        }),
        fill: new Fill({
            color: "rgba(100, 100, 255, 0.1)",
        }),
    }),
}

export default styles;