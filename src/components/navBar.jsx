import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand text-danger " to="/">
          מסירת חבילות
        </Link>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup ">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/Receiving">
              קבלת חבילה
            </NavLink>
            <NavLink className="nav-item nav-link" to="/Deliver">
              מסירת חבילה
            </NavLink>
            <NavLink className="nav-item nav-link" to="/all-packages">
              כל החבילות
            </NavLink>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
