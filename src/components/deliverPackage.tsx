import * as React from "react";

class DeliverPackage extends React.Component {
  state = {};
  render() {
    return (
      <div className="card text-center  align-middle">
        <div className="card-header">מסירת חבילה</div>
        <div className="card-body">
          <h5 className="card-title">הכנס ברקוד</h5>
          <input autoFocus={true} type="text" className="form-control" />
        </div>
        <div className="card-text" />
        <div className="card-footer text-muted" />
      </div>
    );
  }
}

export default DeliverPackage;
