export const filterPolygons = (data, bounds) => {

    //filter only polygons of which at least 1 point is within map bounds
    const filteredPolygons = data.filter((polygon) => {
        return polygon.geometry.coordinates[0].some((coordLatLong) => {
            return (
                //check if the particular point is within map bounds (i.e the value is between 
                //respective pairs of coordinates of the bounding rectangle)
                bounds._southWest.lat < coordLatLong[0] &&
                coordLatLong[0] < bounds._northEast.lat &&
                bounds._southWest.lng < coordLatLong[1] &&
                coordLatLong[1] < bounds._northEast.lng
            )
        })
    });

    return filteredPolygons;
}