import * as React from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/navBar';
import PackageDelivery from './pages/package-delivery/package-delivery';
import AddPackage from './pages/add-package/add-package';
import AllPackages from './pages/all-packages/all-packages';
import 'react-toastify/dist/ReactToastify.css';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <div className="container">
          <Route path="/deliver" component={PackageDelivery} />
          <Route path="/addPackage" component={AddPackage} />
          <Route path="/all-packages" component={AllPackages} />
        </div>
      </React.Fragment>
    );
  }
}
export default App;
