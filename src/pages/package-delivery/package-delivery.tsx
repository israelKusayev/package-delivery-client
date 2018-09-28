import * as React from 'react';
import * as moment from 'moment';
import { PackageDeliveryState } from './package-delivery.state';

class PackageDelivery extends React.Component<{}, PackageDeliveryState> {
  barcodeIdLength = 8;
  constructor(props: {}) {
    super(props);

    this.state = new PackageDeliveryState();

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // need URL !!
    // fetch('url')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     this.setState({
    //       ...this.state,
    //       allPackages: data
    //     });
    //   });
  }

  async handleChange({
    currentTarget: input
  }: React.FormEvent<HTMLInputElement>) {
    this.setState({
      ...this.state,
      barcodeId: input.value,
      error:
        input.value.length === this.barcodeIdLength
          ? ''
          : `the barcode id should be ${this.barcodeIdLength} characters long `
    });

    if (input.value.length === this.barcodeIdLength) {
      await this.handOverPackage(
        'https://jsonplaceholder.typicode.com/users',
        input.value
      ); // temp url
    }
  }

  async handOverPackage(url: string, barcodeId: string) {
    const now = moment().format();

    await fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({
        handOverPackage: now
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((res) => {
        this.handleErrors(res);
        if (res.ok) {
          this.setState({
            ...this.state,
            deliverySucceeded: true
          });
        }
        return res.json();
      })
      .then((data) => console.log(data));
  }

  handleErrors(res: Response) {
    if (res.status === 404) {
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

  render() {
    const { error, deliverySucceeded } = this.state;

    return (
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
            {' '}
            Deliverd successfuly
          </div>
        )}
        <div className="card-footer text-muted" />
      </div>
    );
  }
}

export default PackageDelivery;
