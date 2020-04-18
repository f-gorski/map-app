import { Map as LeafletMap, TileLayer, Polygon, Marker, Popup, LayersControl, FeatureGroup, LayerGroup } from "react-leaflet";
import React, {Component} from "react";
import { mapBoxUrl } from "../credentials";


export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devPlansData: null,
      singleData: null,
      multiData: null,
      mixedData: null,
      mapBounds: null
    }
  }

  filterPolygons = (data) => {

    let bounds = this.state.mapBounds;

    const filteredPolygons = [];
    let isInBounds;

    //TODO: Refactor aby zamiast forEach() zrobić filter()
    data.forEach( (polygon) => {
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
            devPlansData: devPlans.features
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
      //-----------
      //console.log(terrFunc)
      //-----------

      const singleData = terrFunc.features.filter( (element) => {
        return /^zabudowa jednorodzinna/.test(element.properties.fun_nazwa);
      })

      const multiData = terrFunc.features.filter( (element) => {
        return /^zabudowa wielorodzinna/.test(element.properties.fun_nazwa);
      })

      const mixedData = terrFunc.features.filter( (element) => {
        return /^zabudowa jedno i wielorodzinna/.test(element.properties.fun_nazwa);
      })

      this.setState({
        singleData: singleData,
        multiData: multiData,
        mixedData: mixedData
      })
    })
    .catch( () => alert("Błąd przy wczytywaniu danych o funkcji terenu"))
  }


  render() {
    
    const devPlansData = this.state.devPlansData ? this.filterPolygons(this.state.devPlansData) : null
    const multiData = this.state.multiData ? this.filterPolygons(this.state.multiData) : null
    const singleData = this.state.multiData ? this.filterPolygons(this.state.singleData) : null
    const mixedData = this.state.multiData ? this.filterPolygons(this.state.mixedData) : null

    const nameDevPlans = !this.state.devPlansData ? "<span class='layer loading'>Plany zagospodarowania</span> <span class='loader'></span>" : "<span class='layer'>Plany zagospodarowania</span>"
    const nameMulti = !this.state.multiData ? "<span class='layer loading'>Zabudowa wielorodzinna</span> <span class='loader'></span>" : "<span class='layer'>Zabudowa wielorodzinna</span>"
    const nameSingle = !this.state.singleData ? "<span class='layer loading'>Zabudowa jednorodzinna</span> <span class='loader'></span>" : "<span class='layer'>Zabudowa jednorodzinna</span>"
    const nameMixed = !this.state.mixedData ? "<span class='layer loading'>Zabudowa jedno i wielorodzinna</span> <span class='loader'></span>" : "<span class='layer'>Zabudowa jedno i wielorodzinna</span>"

    const isLoadedDevPlans = !this.state.devPlansData ? "DevPlans false" : "DevPlans true"
    const isLoadedMulti = !this.state.multiData ? "Multi false" : "Multi true"
    const isLoadedSingle = !this.state.singleData ? "Single false" : "Single true"
    const isLoadedMixed = !this.state.mixedData ? "Mixed false" : "Mixed true"

    return (
      <>
      <LeafletMap onZoomEnd={this.handleZoom} onMoveEnd={this.handleMove} center={this.props.center} zoom={this.props.zoom} ref='map' >
        <LayersControl position="topright" collapsed={false} >
          <LayersControl.BaseLayer name="<span style='color: grey'> Mapa podkładowa</span>" checked="true">
            <TileLayer attribution='&amp;copy MapBox' url={mapBoxUrl} />
          </LayersControl.BaseLayer>

        <LayersControl.Overlay name={nameDevPlans} key={isLoadedDevPlans} >             
        <FeatureGroup name="Plany">
        {this.state.devPlansData
        ?
        <LocalDevPlans data={devPlansData} />
        :
        null
        }
        </FeatureGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name={nameSingle} key={isLoadedSingle} >
        <FeatureGroup name="Zabudowa jednorodzinna">
        {this.state.singleData
        ?
        <TerrainSingle data={singleData} />
        :
        null
        }
        </FeatureGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name={nameMulti} key={isLoadedMulti} >
        <FeatureGroup name="Zabudowa wielorodzinna">
        {this.state.multiData
        ?
        <TerrainMulti data={multiData} />
        :
        null
        }
        </FeatureGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name={nameMixed} key={isLoadedMixed} >
        <FeatureGroup name="Zabudowa jedno i wielorodzinna">
        {this.state.mixedData
        ?
        <TerrainMixed data={mixedData} />
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

class TerrainSingle extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const polygons = this.props.data;
    
    const singleRender = polygons.map( (polygon, index) => {
      return(
        <PolygonWrapper key={index} positions={polygon.geometry.coordinates[0]} polygonData={polygon.properties} color="purple"/>
      )
    })
    return(
      <>
        {singleRender}
      </>
    )
  }
}

class TerrainMulti extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const polygons = this.props.data;
    
    const multiRender = polygons.map( (polygon, index) => {
      return(
        <PolygonWrapper key={index} positions={polygon.geometry.coordinates[0]} polygonData={polygon.properties} color="red"/>
      )
    })
    return(
      <>
        {multiRender}
      </>
    )
  }
}

class TerrainMixed extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const polygons = this.props.data;
    
    const mixedRender = polygons.map( (polygon, index) => {
      return(
        <PolygonWrapper key={index} positions={polygon.geometry.coordinates[0]} polygonData={polygon.properties} color="green"/>
      )
    })
    return(
      <>
        {mixedRender}
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
