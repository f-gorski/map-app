import React, { Component } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Switch, Route } from 'react-router-dom';
import Map from "./components/Map";
import LandingPage from "./components/LandingPage";
import Navigation from "./components/Navigation";
import './App.scss';

class App extends Component {

  render() {
    return (
     
      <HashRouter>
        <Navigation />

        <Switch>

          <Route exact path="/">
            <LandingPage />
          </Route>

          <Route path="/mapa">
            
          </Route>

        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("app"));


