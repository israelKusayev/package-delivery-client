import * as React from 'react';
import { AllPAckagesState } from './all-packages.state';
import * as config from '../../config';
import { Package } from './../../models/package.model';

class AllPackages extends React.Component<any, AllPAckagesState> {
  columns = [
    { path: 'barcodeId', title: 'Barcode-Id' },
    { path: 'handoverTo', title: 'Name' },
    { path: 'receivedDate', title: 'Received Date' },
    { path: 'handoverDate', title: 'handover Date' }
  ];

  constructor(props: any) {
    super(props);
    this.state = new AllPAckagesState();
  }

  async componentDidMount() {
    await fetch(config.apiUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const packages: Package[] = JSON.parse(JSON.stringify(data));
        this.setState({ ...this.state, packages });
      });
  }
  render() {
    return (
      <React.Fragment>
        <h1 className="m-4 text-center">All Packages</h1>

        {
          <table className="table">
            <thead>
              <tr>
                {this.columns.map((colmn) => (
                  <th key={colmn.path} className="clickable">
                    {colmn.title}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {this.state.packages.map((p) => (
                <tr key={p.barcodeId}>
                  {this.columns.map((colmn) => (
                    <td key={colmn.path + p.barcodeId}>{p[colmn.path]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        }
      </React.Fragment>
    );
  }
}

export default AllPackages;
