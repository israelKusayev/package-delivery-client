import * as React from 'react';
import * as moment from 'moment';
import * as config from '../../config';
import { PackageDeliveryState } from './package-delivery.state';

class PackageDelivery extends React.Component<{}, PackageDeliveryState> {
  constructor(props: {}) {
    super(props);

    this.state = new PackageDeliveryState();
    this.handleChange = this.handleChange.bind(this);
  }

  async handleChange({
    currentTarget: input
  }: React.FormEvent<HTMLInputElement>): Promise<void> {
    this.setState({
      barcodeId: input.value,
      deliverySucceeded: false,

      error:
        input.value.length === config.barcodeIdLength
          ? ''
          : `the barcode id should be ${
              config.barcodeIdLength
            } characters long `
    });

    if (input.value.length === config.barcodeIdLength) {
      await this.handOverPackage(config.apiUrl, input.value);
    }
  }

  handleErrors(res: Response): void {
    if (res.status === 400) {
      this.setState({
        ...this.state,
        error: 'Package not found, please try again'
      });
    } else if (!res.ok) {
      this.setState({
        ...this.state,
        error: 'sorry, something went wrong'
      });
    }
  }

  async handOverPackage(url: string, barcodeId: string): Promise<void> {
    const now = moment().format();

    await fetch(`${url}/${barcodeId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        handoverDate: now
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then((res) => {
      this.handleErrors(res);
      if (res.ok) {
        this.setState({
          error: '',
          deliverySucceeded: true
        });
        this.setState({ previousBarcodeId: barcodeId });
        this.resetPage();
      }
    });
  }

  resetPage(): void {
    this.setState({ error: '', barcodeId: '' });
  }

  render() {
    const { error, deliverySucceeded } = this.state;

    return (
      <React.Fragment>
        <h1 className="m-4 text-center"> Hand Over Package</h1>
        <div className="card text-center  align-middle">
          <div className="card-header">Hand over package</div>
          <div className="card-body">
            <h5 className="card-title">Type barcode-id</h5>
            <input
              className="form-control"
              type="text"
              autoFocus={true}
              value={this.state.barcodeId}
              onChange={this.handleChange}
            />
          </div>
          {error && <div className="card-text alert alert-danger">{error}</div>}
          {deliverySucceeded && (
            <div className="card-text alert alert-success">
              {`package with barcode-id \xa0 '${
                this.state.previousBarcodeId
              }'\xa0 handover successfuly`}
            </div>
          )}
          <div className="card-footer text-muted" />
        </div>
      </React.Fragment>
    );
  }
}

export default PackageDelivery;
