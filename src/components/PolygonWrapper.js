import React, {Component} from "react";
import { Polygon, Popup } from "react-leaflet";

export default class PolygonWrapper extends Component {
    constructor(props) {
      super(props);
      this.polygonRef = React.createRef();
      this.state = {
        popup: null
      }
    }
  
    handlePolygonClick = (e) => {
        //TODO
    }
      
    render() {
      let popup = null;
  
      if(this.props.type == "terrFunc") {
        popup = 
        <ul className="popup">
          <li><span>Typ zabudowy:</span> {this.props.polygonData.fun_nazwa}</li>
          <li><span>Maksymalna wysokość:</span> {this.props.polygonData.max_wys} m</li>
          <li><span>Liczba kondygnacji:</span> {this.props.polygonData.licz_kond}</li>
          <li><span>Powierzchnia biologicznie czynna:</span> {this.props.polygonData.pow_bio}%</li>
        </ul>
      } 
      else if(this.props.type == "devPlan") {
        popup =
        <ul className="popup">
          <li><span>Nazwa planu:</span> {this.props.polygonData.nazwa_planu}</li>
          <li><span>Typ planu:</span> {this.props.polygonData.typ_planu}</li>
          <li><span>Dzielnica:</span> {this.props.polygonData.dzielnica}</li>
        </ul>
      }
      
      return (
        <Polygon ref={this.polygonRef} positions={this.props.positions} polygonData={this.props.polygonData} color={this.props.color} >
          <Popup closeOnEscapeKey={false}>
            {popup}
          </Popup>
        </Polygon>
      )
    }
  }