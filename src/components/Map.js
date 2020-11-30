import { Map as LeafletMap, TileLayer, LayersControl, FeatureGroup } from "react-leaflet";
import React, { Component } from "react";
import { mapBoxUrl } from "../Mapbox/credentials";
import PolygonLayer from "./PolygonLayer";
import { filterPolygons } from "../utilities/filterPolygons";
import { assignControlName } from "../utilities/assignControlName";

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.map = React.createRef();

    this.state = {
      devPlansData: null,
      singleData: null,
      multiData: null,
      mixedData: null,
      mapBounds: null,
    }
  }

  handleZoom = (e) => {
    this.setState({
      mapBounds: this.map.current.leafletElement.getBounds()
    })
  }

  handleMove = (e) => {
    this.setState({
      mapBounds: this.map.current.leafletElement.getBounds()
    })
  }

  componentDidMount() {
    this.setState({
      mapBounds: this.map.current.leafletElement.getBounds()
    })

    //Proxy to allow CORS because API unfortunately does not provide required header
    const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
    const DEVPLANS_URL = "https://mapa.um.warszawa.pl/WebServices/ZasiegiPlanow/wgs84/findAll/";
    const TERRAINFUNCTION_URL = "http://mapa.um.warszawa.pl/WebServices/PrzeznaczenieTerenow/wgs84/findByFunName/zabudowa";

    //Fetch development layer data
    fetch(PROXY_URL + DEVPLANS_URL)
      .then(result => result.json())
      .then(devPlans => {
        devPlans.features.forEach((feature) => {
          feature.geometry.coordinates[0].forEach((coordXY) => {
            coordXY.reverse();
          })
        })

        this.setState({
          devPlansData: devPlans.features,
        })
      })
      .catch(() => alert("Błąd przy wczytywaniu danych o planach zagospodarowania"));

    //Fetch terrain function layer data
    fetch(PROXY_URL + TERRAINFUNCTION_URL)
      .then(result => result.json())
      .then(terrFunc => {
        //Coordinates are in inappropiate format, required to reverse each XY pair for each point in each feature
        terrFunc.features.forEach((feature) => {
          feature.geometry.coordinates[0].forEach((coordXY) => {
            coordXY.reverse()
          })
        })

        const singleData = terrFunc.features.filter((element) => {
          return /^zabudowa jednorodzinna/.test(element.properties.fun_nazwa);
        })

        const multiData = terrFunc.features.filter((element) => {
          return /^zabudowa wielorodzinna/.test(element.properties.fun_nazwa);
        })

        const mixedData = terrFunc.features.filter((element) => {
          return /^zabudowa jedno i wielorodzinna/.test(element.properties.fun_nazwa);
        })

        this.setState({
          singleData: singleData,
          multiData: multiData,
          mixedData: mixedData,
        })
      })
      .catch(() => alert("Błąd przy wczytywaniu danych o funkcji terenu"))
  }

  render() {
    const { devPlansData, multiData, singleData, mixedData, mapBounds } = this.state;

    //Filter polygons so only the ones that are within current mapBounds are to be rendered
    const filteredDevPlansData = devPlansData && filterPolygons(devPlansData, mapBounds)
    const filteredMultiData = multiData && filterPolygons(multiData, mapBounds)
    const filteredSingleData = singleData && filterPolygons(singleData, mapBounds)
    const filteredMixedData = mixedData && filterPolygons(mixedData, mapBounds)

    //react-leaflet LayersControl.Overlay component requires name prop as a string containing
    //HTML element with its content, classes etc. This is the reason behind this assignment below
    const nameDevPlans = assignControlName(devPlansData, "Plany zagospodarowania")
    const nameMulti = assignControlName(multiData, "Zabudowa wielorodzinna")
    const nameSingle = assignControlName(singleData, "Zabudowa jednorodzinna")
    const nameMixed = assignControlName(mixedData, "Zabudowa jedno i wielorodzinna")

    return (
      <LeafletMap onZoomEnd={this.handleZoom} onMoveEnd={this.handleMove} center={this.props.center} zoom={this.props.zoom} ref={this.map} >
        <LayersControl position="topright" collapsed={false}>
          <TileLayer attribution='&amp;copy MapBox' url={mapBoxUrl} />

          <LayersControl.Overlay name={nameDevPlans} key={nameDevPlans} checked={true}>
            <FeatureGroup name="Zagospodarowanie przestrzenne">
              {this.state.devPlansData
                ?
                <PolygonLayer data={filteredDevPlansData} color="#2DD5C9" type="devPlan" />
                :
                null
              }
            </FeatureGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name={nameSingle} key={nameSingle} checked={true}>
            <FeatureGroup name="Zabudowa jednorodzinna">
              {this.state.singleData
                ?
                <PolygonLayer data={filteredSingleData} color="#6B5B95" type="terrFunc" />
                :
                null
              }
            </FeatureGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name={nameMulti} key={nameMulti} checked={true}>
            <FeatureGroup name="Zabudowa wielorodzinna">
              {this.state.multiData
                ?
                <PolygonLayer data={filteredMultiData} color="#FF6F61" type="terrFunc" />
                :
                null
              }
            </FeatureGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name={nameMixed} key={nameMixed} checked={true}>
            <FeatureGroup name="Zabudowa jedno i wielorodzinna">
              {this.state.mixedData
                ?
                <PolygonLayer data={filteredMixedData} color="#3D9970" type="terrFunc" />
                :
                null
              }
            </FeatureGroup>
          </LayersControl.Overlay>

        </LayersControl>
      </LeafletMap>
    )
  }
}