import * as React from 'react';
import * as moment from 'moment';
import { AddPackageState } from './add-package.state';

class AddPackage extends React.Component<{}, AddPackageState> {
  constructor(props: {}) {
    super(props);
    this.state = new AddPackageState();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate() {
    const errors = this.state.errors;
    if (this.state.barcodeId === '') {
      errors.barcodeIdError = 'Barcode-id is required';
    }
    if (this.state.handoverTo === '') {
      errors.handoverToError = 'Name is required';
    }
    this.setState({ errors });
  }

  handleChange({ currentTarget: input }: React.FormEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      [input.name]: input.value
    });
  }

  handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    this.validate();
    fetch('http://localhost:3001/api/packages', {
      method: 'POST',
      body: JSON.stringify({
        barcodeId: this.state.barcodeId,
        handoverTo: this.state.handoverTo,
        receivedDate: moment()
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  render() {
    return (
      <div>
        <h1 className="m-4 text-center">Add Package</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group ">
            <label htmlFor="barcodeId">Barcode-id:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.barcodeId}
              id="barcodeId"
              name="barcodeId"
              autoFocus={true}
              onChange={this.handleChange}
            />
            {this.state.errors.barcodeIdError && (
              <div className="alert alert-danger">
                {this.state.errors.barcodeIdError}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="personName">Name:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.handoverTo}
              id="personName"
              name="handoverTo"
              onChange={this.handleChange}
            />
            {this.state.errors.handoverToError && (
              <div className="alert alert-danger">
                {this.state.errors.handoverToError}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Add package
          </button>
        </form>
      </div>
    );
  }
}

export default AddPackage;
