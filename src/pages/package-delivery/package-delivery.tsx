import * as React from 'react';
import { PackageDeliveryState } from './package-delivery.state';

class PackageDelivery extends React.Component<{}, PackageDeliveryState> {
  constructor(props: {}) {
    super(props);

    this.state = new PackageDeliveryState();

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: React.FormEvent<HTMLInputElement>) {
    this.setState(
      {
        ...this.state,
        barcodeId: event.currentTarget.value
      },
      () => {
        console.log(this.state);
      }
    );
  }

  render() {
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
        <div className="card-text" />
        <div className="card-footer text-muted" />
      </div>
    );
  }
}

export default PackageDelivery;
