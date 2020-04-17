import { Map as LeafletMap, TileLayer, Polygon, Marker, Popup, LayersControl, FeatureGroup } from "react-leaflet";
import React, {Component} from "react";
import { mapBoxUrl } from "../credentials";


export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devPlansData: null,
      terrFuncData: null,
      mapBounds: null
    }
  }

  filterPolygons = (data) => {

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


    const proxyURL = "https://cors-anywhere.herokuapp.com/";
        const devPlansURL = "https://mapa.um.warszawa.pl/WebServices/ZasiegiPlanow/wgs84/findAll/";
        fetch(proxyURL + devPlansURL)
        .then( result => result.json() )
        .then( devPlans => {
          devPlans.features.forEach( (feature) => {
            feature.geometry.coordinates[0].forEach( (coordXY) => {
              coordXY.reverse();
            })
          })

          this.setState({
            devPlansData: devPlans
          })
        })
        .catch( () => alert("Błąd przy wczytywaniu danych o planach zagospodarowania"));

    const terrainFunctionURL = "http://mapa.um.warszawa.pl/WebServices/PrzeznaczenieTerenow/wgs84/findByFunName/zabudowa"
    fetch(proxyURL + terrainFunctionURL)
    .then( result => result.json() )
    .then( terrFunc => {
      terrFunc.features.forEach( (feature) => {
        feature.geometry.coordinates[0].forEach( (coordXY) => {
          coordXY.reverse()
        })
      })

      this.setState({
        terrFuncData: terrFunc
      })
    })
    .catch( () => alert("Błąd przy wczytywaniu danych o funkcji terenu"))
  }


  render() {
    
    const devPlansData = this.state.devPlansData ? this.filterPolygons(this.state.devPlansData) : null
    const terrFuncData = this.state.terrFuncData ? this.filterPolygons(this.state.terrFuncData) : null

    const nameDevPlans = !this.state.devPlansData ? "<span class='layer'>Plany zagospodarowania</span> <span class='loader'></span>" : "<span class='layer'>Plany zagospodarowania</span>"
    const nameTerrFunc = !this.state.terrFuncData ? "<span class='layer'>Przeznaczenie terenów</span> <span class='loader'></span>" : "<span class='layer'>Przeznaczenie terenów</span>"

    const isLoadedDevPlans = !this.state.devPlansData ? "DevPlans false" : "DevPlans true"
    const isLoadedTerrFunc = !this.state.terrFuncData ? "TerrFunc false" : "TerrFunc true"

    return (
      <>
      <LeafletMap onZoomEnd={this.handleZoom} onMoveEnd={this.handleMove} center={this.props.center} zoom={this.props.zoom} ref='map' >
        <LayersControl position="topright" collapsed={null} >
          <LayersControl.BaseLayer name="<span style='color: grey'> Mapa podkładowa</span>" checked="true">
            <TileLayer attribution='&amp;copy MapBox' url={mapBoxUrl} />
          </LayersControl.BaseLayer>

        <LayersControl.Overlay name={nameDevPlans} key={isLoadedDevPlans} checked="true">             
        <FeatureGroup name="Plany">
        {this.state.devPlansData
        ?
        <LocalDevPlans data={devPlansData} />
        :
        null
        }
        </FeatureGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name={nameTerrFunc} key={isLoadedTerrFunc} checked="true">
        <FeatureGroup name="Funkcje terenu">
        {this.state.terrFuncData
        ?
        <TerrainFunction data={terrFuncData} />
        :
        null
        }
        </FeatureGroup>
        </LayersControl.Overlay>
      </LayersControl>
      </LeafletMap>
      
      </>
    )
  }
}

class TerrainFunction extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.data)
    const polygons = this.props.data;

    const polyRender = polygons.map( (polygon, index) => {
      return(
        <PolygonWrapper key={index} positions={polygon.geometry.coordinates[0]} polygonData={polygon.properties} color="#005b96"/>
      )
    })

    return(
      <>
        {polyRender};
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
        <PolygonWrapper key={index} positions={polygon.geometry.coordinates[0]} polygonData={polygon.properties} color="#2DD5C9"/>
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
      
    }
    

  render() {
    return (
      <Polygon ref={this.polygonRef} positions={this.props.positions} polygonData={this.props.polygonData} color={this.props.color} >
        
        <Popup closeOnEscapeKey={false}>
        <ul className="popup">
          <li>
            <span>{this.props.polygonData.nazwa_planu}</span>
            <span>{this.props.polygonData.fun_nazwa}</span>
          </li>
        </ul>
        </Popup>
      </Polygon>
    )
  }
}
