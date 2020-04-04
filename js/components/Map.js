import { Map as LeafletMap, TileLayer, Polygon, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import React, {Component} from "react";

export default class Map extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LeafletMap center={this.props.center} zoom={this.props.zoom}>
        <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <DevPlans data={this.props.data}/>
      </LeafletMap>
    )
  }
}

class DevPlans extends Component {
  constructor(props) {
    super(props);
  }
  // componentDidMount() {

  // }

  render() {
    //console.log(this.props.data.features[0].geometry.coordinates[0])

    return(
      <Polygon positions={this.props.data.features[0].geometry.coordinates[0]}/>
    )
  }
}
