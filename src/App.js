import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Switch, Route } from 'react-router-dom';
import Map from "./components/Map";
import LandingPage from "./components/LandingPage";
import Navigation from "./components/Navigation";
import './App.scss';

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
    return (
     
      <HashRouter>
        <Navigation />

        <Switch>

          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route path="/mapa">
            <Map center={this.state.lat, this.state.lng} zoom={this.state.zoom} data={this.state.data} />
          </Route>

        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));


