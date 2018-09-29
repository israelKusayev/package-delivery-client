import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
class NavBar extends React.Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light  mb-2 ">
        <Link className="navbar-brand text-danger ml-3" to="/">
          Package Delivery Managment
        </Link>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup ">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link m-2" to="/receiving">
              Add package
            </NavLink>
            <NavLink className="nav-item nav-link m-2" to="/deliver">
              Hand over package
            </NavLink>
            <NavLink className="nav-item nav-link m-2" to="/all-packages">
              All packages{' '}
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}
export default NavBar;
