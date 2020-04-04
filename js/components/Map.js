import { Map as LeafletMap, TileLayer, Polygon, Marker, Popup } from "react-leaflet";
import React, {Component} from "react";


export default class Map extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LeafletMap center={this.props.center} zoom={this.props.zoom}>
        <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <DevPlans data={this.props.data} />
      </LeafletMap>
    )
  }
}

class DevPlans extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const polygons = this.props.data.features;

    const polygonsCoords = [];

    polygons.forEach( (polygon) => {
      const singlePolygonCoords = [];
      polygon.geometry.coordinates[0].forEach( (pointCoords) => {
        singlePolygonCoords.push(pointCoords.reverse())
      })
      polygonsCoords.push(singlePolygonCoords);
    })

    const polyRender = polygonsCoords.map( (polygonXY, index) => {
      return <Polygon key={index} positions={polygonXY}/>
    })

    return(
      <>
        {polyRender};
      </>
    )
  }
}
