import { Map as LeafletMap, TileLayer, LayersControl, FeatureGroup, LayerGroup } from "react-leaflet";
import React, { Component } from "react";
import { mapBoxUrl } from "../Mapbox/credentials";
import PolygonLayer from "./PolygonLayer";

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devPlansData: null,
      singleData: null,
      multiData: null,
      mixedData: null,
      mapBounds: null,
    }
  }

  filterPolygons = (data) => {

    let bounds = this.state.mapBounds;

    const filteredPolygons = data.filter((polygon) => {
      return polygon.geometry.coordinates[0].some((coordLatLong) => {
        return (
          bounds._southWest.lat < coordLatLong[0] &&
          coordLatLong[0] < bounds._northEast.lat &&
          bounds._southWest.lng < coordLatLong[1] &&
          coordLatLong[1] < bounds._northEast.lng
        )
      })
    });

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

    const terrainFunctionURL = "http://mapa.um.warszawa.pl/WebServices/PrzeznaczenieTerenow/wgs84/findByFunName/zabudowa"
    fetch(proxyURL + terrainFunctionURL)
      .then(result => result.json())
      .then(terrFunc => {
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
    const devPlansData = this.state.devPlansData ? this.filterPolygons(this.state.devPlansData) : null
    const multiData = this.state.multiData ? this.filterPolygons(this.state.multiData) : null
    const singleData = this.state.multiData ? this.filterPolygons(this.state.singleData) : null
    const mixedData = this.state.multiData ? this.filterPolygons(this.state.mixedData) : null



    //TODO Refactor 
    const nameDevPlans = !this.state.devPlansData ? "<span class='layer loading'>Plany zagospodarowania</span> <span class='loader'></span>" : "<span class='layer'>Plany zagospodarowania</span>"
    const nameMulti = !this.state.multiData ? "<span class='layer loading'>Zabudowa wielorodzinna</span> <span class='loader'></span>" : "<span class='layer'>Zabudowa wielorodzinna</span>"
    const nameSingle = !this.state.singleData ? "<span class='layer loading'>Zabudowa jednorodzinna</span> <span class='loader'></span>" : "<span class='layer'>Zabudowa jednorodzinna</span>"
    const nameMixed = !this.state.mixedData ? "<span class='layer loading'>Zabudowa jedno i wielorodzinna</span> <span class='loader'></span>" : "<span class='layer'>Zabudowa jedno i wielorodzinna</span>"

    return (
      <>
        <LeafletMap onZoomEnd={this.handleZoom} onMoveEnd={this.handleMove} center={this.props.center} zoom={this.props.zoom} ref='map' >
          <LayersControl position="topright" collapsed={false}>
            <TileLayer attribution='&amp;copy MapBox' url={mapBoxUrl} />

            <LayersControl.Overlay name={nameDevPlans} key={nameDevPlans} checked={true}>
              <FeatureGroup name="Zagospodarowanie przestrzenne">
                {this.state.devPlansData
                  ?
                  <PolygonLayer data={devPlansData} color="#2DD5C9" type="devPlan" />
                  :
                  null
                }
              </FeatureGroup>
            </LayersControl.Overlay>

            <LayersControl.Overlay name={nameSingle} key={nameSingle} checked={true}>
              <FeatureGroup name="Zabudowa jednorodzinna">
                {this.state.singleData
                  ?
                  <PolygonLayer data={singleData} color="#6B5B95" type="terrFunc" />
                  :
                  null
                }
              </FeatureGroup>
            </LayersControl.Overlay>

            <LayersControl.Overlay name={nameMulti} key={nameMulti} checked={true}>
              <FeatureGroup name="Zabudowa wielorodzinna">
                {this.state.multiData
                  ?
                  <PolygonLayer data={multiData} color="#FF6F61" type="terrFunc" />
                  :
                  null
                }
              </FeatureGroup>
            </LayersControl.Overlay>

            <LayersControl.Overlay name={nameMixed} key={nameMixed} checked={true}>
              <FeatureGroup name="Zabudowa jedno i wielorodzinna">
                {this.state.mixedData
                  ?
                  <PolygonLayer data={mixedData} color="#3D9970" type="terrFunc" />
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