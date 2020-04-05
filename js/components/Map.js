import { Map as LeafletMap, TileLayer, Polygon, Marker, Popup } from "react-leaflet";
import React, {Component} from "react";
import { Redirect } from "react-router-dom";


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


 

    // e.target.setStyle({
    //   color: 'green'
    // })
    // e.target.refs.polygonRef.setStyle({
    //   color: "red",
    //   fillColor: "yellow"
    // })
 

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
        <MyPolygon key={index} positions={polygonXY} polygonData={polygons[index].properties} />
      )
    })

    return(
      <>
        {polyRender};
      </>
    )
  }
}

class MyPolygon extends Component {
  constructor(props) {
    super(props);
    this.polygonRef = React.createRef();
  }

  handlePolygonClick = (e) => {
    console.log(this.polygonRef.current)
    console.log(e.target);

    this.polygonRef.current.setStyle({
      color: 'green'
    })
  }

  render() {
    return (
      <Polygon onClick={this.handlePolygonClick} ref={this.polygonRef} positions={this.props.positions} polygonData={this.props.polygonData}>
        <Popup>
        <ul className="devPlan-popup">
          <li><span>Nazwa planu:</span> {polygons[index].properties.nazwa_planu}</li>
          <li><span>Dzielnica:</span> {polygons[index].properties.dzielnica}</li>
          <li><span>Typ planu:</span> {polygons[index].properties.typ_planu}</li>
          <li><span>Data uchwalenia:</span> {polygons[index].properties.data_uchwalenia}</li>
        </ul>
        </Popup>
      </Polygon>
    )
  }
}
