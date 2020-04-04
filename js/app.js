import React, {Component} from "react";
import ReactDOM from "react-dom";
import Map from "./components/Map";

  
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 52.23235,
            lng: 21.00412,
            zoom: 14,
            data: false
          }
    }

    componentDidMount() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const url = "https://mapa.um.warszawa.pl/WebServices/ZasiegiPlanow/wgs84/findAll/";
        fetch(proxyurl + url)
        .then( result => result.json() )
        .then( objects => this.setState({
            data: objects
        }))
        .catch(() => alert("Błąd przy wczytywaniu danych"));
    }
    
    render() {
      const position = [this.state.lat, this.state.lng]
      console.log(this.state.data);
      return (
        this.state.data 
        ?
        <Map center={position} zoom={this.state.zoom} data={this.state.data} />
        :
        <div>Wczytuję dane</div>
      )
    }
  }

ReactDOM.render(<App />, document.getElementById("mapid"));


