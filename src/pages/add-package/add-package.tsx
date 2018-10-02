import * as React from 'react';
import * as moment from 'moment';
import * as _ from 'lodash';
import { toast } from 'react-toastify';
import * as config from '../../config';
import { AddPackageState } from './add-package.state';

class AddPackage extends React.Component<{}, AddPackageState> {
  inputNames = {
    barcodeId: 'barcodeId',
    handoverTo: 'handoverTo'
  };
  private barcodeIdInput: React.RefObject<HTMLInputElement>;

  constructor(props: {}) {
    super(props);
    this.state = new AddPackageState();
    this.barcodeIdInput = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate(): object {
    const errors: object = {};
    if (this.state.barcodeId === '') {
      errors[this.inputNames.barcodeId] = 'Barcode-id is required';
    } else if (this.state.barcodeId.length !== 8) {
      errors[this.inputNames.barcodeId] = `the barcode id should be ${
        config.barcodeIdLength
      } characters long `;
    }
    if (this.state.handoverTo === '') {
      errors[this.inputNames.handoverTo] = 'Name is required';
    }
    return errors;
  }

  handleChange({ currentTarget: input }: React.FormEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      [input.name]: input.value,
      successMessage: ''
    });
  }

  handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const errors = this.validate();

    if (!_.isEmpty(errors)) {
      this.setState({ errors });
      return;
    }
    this.setState({ errors: {} });
    this.doSubmit();
  }

  async doSubmit() {
    await fetch(config.apiUrl, {
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
      .then((res) => {
        if (res.status === 400) {
          throw new Error('this package is already exists in database');
        } else if (!res.ok) {
          throw new Error('something went wrong');
        }
        this.setState({
          successMessage: `package with barcode-id \xa0 '${
            this.state.barcodeId
          }'\xa0 to \xa0'${this.state.handoverTo}'\xa0 added successfuly`
        });
      })
      .catch((err) => {
        toast.error(err.message);
        return err;
      });

    this.resetForm();
  }

  resetForm() {
    this.setState({ barcodeId: '', handoverTo: '' });
    if (this.barcodeIdInput.current) {
      this.barcodeIdInput.current.focus();
    }
  }

  render() {
    const state = this.state;
    return (
      <div>
        <h1 className="m-4 text-center">Add Package</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group ">
            <label htmlFor="barcodeId">Barcode-id:</label>
            <input
              type="text"
              className="form-control"
              value={state.barcodeId}
              id="barcodeId"
              name={this.inputNames.barcodeId}
              autoFocus={true}
              onChange={this.handleChange}
              ref={this.barcodeIdInput}
            />
            {state.errors[this.inputNames.barcodeId] && (
              <div className="alert alert-danger">
                {state.errors[this.inputNames.barcodeId]}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="personName">Name:</label>
            <input
              type="text"
              className="form-control"
              value={state.handoverTo}
              id="personName"
              name={this.inputNames.handoverTo}
              onChange={this.handleChange}
            />
            {state.errors[this.inputNames.handoverTo] && (
              <div className="alert alert-danger">
                {state.errors[this.inputNames.handoverTo]}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Add package
          </button>
        </form>

        {this.state.successMessage !== '' && (
          <h5 className="alert alert-success my-4">
            {this.state.successMessage}
          </h5>
        )}
      </div>
    );
  }
}

export default AddPackage;
