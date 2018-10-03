import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/navBar';
import PackageDelivery from './pages/package-delivery/package-delivery';
import AddPackage from './pages/add-package/add-package';
import AllPackages from './pages/all-packages/all-packages';
import NotFound from './pages/not-found';
import 'react-toastify/dist/ReactToastify.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSortDown,
  faSortUp,
  faSadTear
} from '@fortawesome/free-solid-svg-icons';

library.add(faSortDown, faSortUp, faSadTear);
class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <div className="container">
          <Switch>
            <Route path="/deliver" component={PackageDelivery} />
            <Route path="/add-package" component={AddPackage} />
            <Route path="/all-packages" component={AllPackages} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact={true} to="/add-package" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}
export default App;
