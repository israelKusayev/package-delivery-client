import * as React from "react";
import { Link, NavLink } from "react-router-dom";
class NavBar extends React.Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light  mb-2 ">
        <Link className="navbar-brand text-danger ml-3" to="/">
          מסירת חבילות
        </Link>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup ">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link m-2" to="/receiving">
              קבלת חבילה
            </NavLink>
            <NavLink className="nav-item nav-link m-2" to="/deliver">
              מסירת חבילה
            </NavLink>
            <NavLink className="nav-item nav-link m-2" to="/all-packages">
              כל החבילות
            </NavLink>
            <div className="pull-left m-2">
              {/* <BackBtn label="חזור" path={"/"} /> */}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
export default NavBar;
