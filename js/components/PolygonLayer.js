import React, {Component} from "react";

import PolygonWrapper from "./PolygonWrapper"
  
  export default class PolygonLayer extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      const polygons = this.props.data;
  
      const polyRender = polygons.map( (polygon, index) => {
        return(
          <PolygonWrapper key={index} positions={polygon.geometry.coordinates[0]} polygonData={polygon.properties} color={this.props.color} type={this.props.type}/>
        )
      })
  
      return(
        <>
          {polyRender};
        </>
      )
    }
  }