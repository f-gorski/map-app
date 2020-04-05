import { Map as LeafletMap, TileLayer, Polygon, Marker, Popup } from "react-leaflet";
import React, {Component} from "react";


export default class Map extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LeafletMap onClick={this.handleClick} center={this.props.center} zoom={this.props.zoom} >
        <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {this.props.data
        ?
        <LocalDevPlans data={this.props.data} />
        :
        null
        }

      </LeafletMap>
    )
  }
}

class LocalDevPlans extends Component {
  constructor(props) {
    super(props);
  }


  handlePolygonClick = (e) => {
    console.log("Kliknięto poligon");
    const polygon = this.ref.current;
    console.log(polygon);
    //console.log(polygon.props.polygonData.nazwa_planu);
  }

  render() {
    const polygons = this.props.data.features;

    const polygonsCoords = [];
    let singlePolygonCoords;

    polygons.forEach( (polygon) => {
      singlePolygonCoords = [];
      polygon.geometry.coordinates[0].forEach( (pointCoords) => {
        singlePolygonCoords.push(pointCoords.reverse())
      })
      polygonsCoords.push(singlePolygonCoords);
    })

    const polyRender = polygonsCoords.map( (polygonXY, index) => {
      return(
        <Polygon onClick={this.handlePolygonClick} ref="polygon" key={index} positions={polygonXY} polygonData={polygons[index].properties}>
          <Popup>
            <ul className="devPlan-popup">
              <li>Nazwa planu: {polygons[index].properties.nazwa_planu}</li>
              <li>Dzielnica: {polygons[index].properties.dzielnica}</li>
              <li>Typ planu: {polygons[index].properties.typ_planu}</li>
              <li>Data uchwalenia: {polygons[index].properties.data_uchwalenia}</li>
            </ul>
          </Popup>
        </Polygon>
      )
    })

    return(
      <>
        {polyRender};
      </>
    )
  }
}
