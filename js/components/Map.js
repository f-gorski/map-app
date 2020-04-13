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
    console.log(bounds);

    console.log(data)

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
    
    console.log("filteredPolygons", filteredPolygons);
    
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
     console.log("Component Did Mount", this.refs.map.leafletElement.getBounds())
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
    console.log(polygonData)
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
    // e.target.setStyle({
    //   color: 'green'
    // })
    // e.target.refs.polygonRef.setStyle({
    //   color: "red",
    //   fillColor: "yellow"
    // })
 

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
    //console.log(this.polygonRef.current.leafletElement.getCenter());
    //console.log(e.target);
    //this.polygonRef.current.on("click", (e) => {
      this.setState({
        clicked: this.polygonRef.current
      })
    console.log(this.state.clicked);
    }
    

  render() {
    return (
      <Polygon onClick={this.handlePolygonClick} click={() => console.log("to jest leaflet event")} ref={this.polygonRef} positions={this.props.positions} polygonData={this.props.polygonData} color={"#2DD5C9"} >
        
        <Popup closeOnEscapeKey={false}>
        <ul className="devPlan-popup">
          <li>
            <span>{this.props.polygonData.nazwa_planu}</span>
          </li>
          {/* <li><span>Nazwa planu:</span> {polygons[index].properties.nazwa_planu}</li>
          <li><span>Dzielnica:</span> {polygons[index].properties.dzielnica}</li>
          <li><span>Typ planu:</span> {polygons[index].properties.typ_planu}</li>
          <li><span>Data uchwalenia:</span> {polygons[index].properties.data_uchwalenia}</li> */}
        </ul>
        </Popup>
      </Polygon>
    )
  }
}
