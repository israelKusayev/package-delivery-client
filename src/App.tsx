import * as React from 'react';
import { Route } from 'react-router-dom';
import NavBar from './components/navBar';
import PackageDelivery from './pages/package-delivery/package-delivery';
import AddPackage from './pages/add-package/add-package';
// import { Route } from "react-router";

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container">
          <Route path="/deliver" component={PackageDelivery} />
          <Route path="/addPackage" component={AddPackage} />
        </div>
      </React.Fragment>
    );
  }
}
export default App;
