import { Map as LeafletMap, TileLayer, Polygon, Marker, Popup } from "react-leaflet";
import React, {Component} from "react";


export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      mapBounds: null
    }
  }

  choosePolygons = (data) => {

    let bounds = this.state.mapBounds;

    const filteredPolygons = [];
    let isInBounds;

    data.features.forEach( (polygon) => {
      isInBounds = polygon.geometry.coordinates[0].some( (coordLatLong) => {
        return bounds._southWest.lat < coordLatLong[0] && 
              coordLatLong[0] < bounds._northEast.lat && bounds._southWest.lng < coordLatLong[1] && coordLatLong[1] < bounds._northEast.lng
      }) 
      isInBounds
      ?
      filteredPolygons.push(polygon)
      :
      null;
    })
    
    
    return filteredPolygons;
  }

  handleZoom = (e) => {
    this.setState({
      mapBounds: this.refs.map.leafletElement.getBounds()
    })
  }

  handleMove = (e) => {
    this.setState({
      mapBounds: this.refs.map.leafletElement.getBounds()
    })
  }

   componentDidMount() {
    this.setState({
      mapBounds: this.refs.map.leafletElement.getBounds()
    })


    const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://mapa.um.warszawa.pl/WebServices/ZasiegiPlanow/wgs84/findAll/";
        fetch(proxyurl + url)
        .then( result => result.json() )
        .then( objects => {
          objects.features.forEach( (feature) => {
            feature.geometry.coordinates[0].forEach( (coordXY) => {
              coordXY.reverse();
            })
          })

          this.setState({
            data: objects
          })
        })
        .catch(() => alert("Błąd przy wczytywaniu danych"));
  }

  render() {
    
    const polygonData = this.state.data ? this.choosePolygons(this.state.data) : null

    return (
      <>
      <LeafletMap onZoomEnd={this.handleZoom} onMoveEnd={this.handleMove} center={this.props.center} zoom={this.props.zoom} ref='map' >
        <TileLayer attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {this.state.data
        ?
        <LocalDevPlans data={polygonData} />
        :
        null
        }

      </LeafletMap>
      
      </>
    )
  }
}

class LocalDevPlans extends Component {
  constructor(props) {
    super(props);
  }
 
  handlePolygonClick = (e) => {
    const polygon = this.ref.current;
  }

  render() {
    const polygons = this.props.data;

    

    const polyRender = polygons.map( (polygon, index) => {
      return(
        <PolygonWrapper key={index} positions={polygon.geometry.coordinates[0]} polygonData={polygon.properties} />
      )
    })

    return(
      <>
        {polyRender};
      </>
    )
  }
}

class PolygonWrapper extends Component {
  constructor(props) {
    super(props);
    this.polygonRef = React.createRef();
    this.state = {
      clicked: null
    }
  }

  handlePolygonClick = (e) => {
      this.setState({
        clicked: this.polygonRef.current
      })
    }
    

  render() {
    return (
      <Polygon onClick={this.handlePolygonClick} ref={this.polygonRef} positions={this.props.positions} polygonData={this.props.polygonData} color={"#2DD5C9"} >
        
        <Popup closeOnEscapeKey={false}>
        <ul className="devPlan-popup">
          <li>
            <span>{this.props.polygonData.nazwa_planu}</span>
          </li>
        </ul>
        </Popup>
      </Polygon>
    )
  }
}
