import { Fill, Stroke, Style } from 'ol/style';

let styles = {
    "DevPlansPolygon": new Style({
        stroke: new Stroke({
            color: "rgb(45, 213, 201)",
            width: 2,
        }),
        fill: new Fill({
            color: "rgba(45, 213, 201, 0.2)",
        }),
    }),
    "SinglePolygon": new Style({
        stroke: new Stroke({
            color: "rgb(107, 91, 149)",
            width: 2,
        }),
        fill: new Fill({
            color: "rgba(107, 91, 149, 0.2)",
        }),
    }),
    "MultiPolygon": new Style({
        stroke: new Stroke({
            color: "rgb(255, 111, 97)",
            width: 2,
        }),
        fill: new Fill({
            color: "rgba(255, 111, 97, 0.2)",
        }),
    }),
    "MixedPolygon": new Style({
        stroke: new Stroke({
            color: "rgb(61, 153, 112)",
            width: 2,
        }),
        fill: new Fill({
            color: "rgba(61, 153, 112, 0.2)",
        }),
    }),
}

export default styles;