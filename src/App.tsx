import * as React from "react";
import "./App.css";
// import { Route } from "react-router-dom";
import NavBar from "./components/navBar";
class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
      </React.Fragment>
    );
  }
}
export default App;
