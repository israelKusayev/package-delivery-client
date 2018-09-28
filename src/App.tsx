import * as React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import NavBar from './components/navBar';
import PackageDelivery from './pages/package-delivery/package-delivery';
// import { Route } from "react-router";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container">
          <Route path="/deliver" component={PackageDelivery} />
        </div>
      </React.Fragment>
    );
  }
}
export default App;
