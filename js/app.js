import React, {Component} from "react";
import ReactDOM from "react-dom";
import Map from "./components/Map";

  
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 52.23235,
            lng: 21.00412,
            zoom: 13,
            data: false
          }
    }
    
    render() {
      const position = [this.state.lat, this.state.lng]
      return (
        <>
        <Map center={position} zoom={this.state.zoom}  />
        </>
      )
    }
  }

ReactDOM.render(<App />, document.getElementById("mapid"));


