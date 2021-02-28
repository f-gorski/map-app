import * as olSource from "ol/source";
import { mapBoxUrl } from "./credentials";

function osm() {
	return new olSource.OSM({
		url: mapBoxUrl,
	});
}

export default osm;