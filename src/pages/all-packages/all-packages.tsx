import * as React from 'react';
import * as _ from 'lodash';
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
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
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

  handleSearch({ currentTarget: input }: React.FormEvent<HTMLInputElement>) {
    this.setState({ searchQuery: input.value });
  }

  handleSort(path: string) {
    const sortOrder = this.state.sortColumn.order;
    this.setState({
      sortColumn: { path, order: sortOrder === 'asc' ? 'desc' : 'asc' }
    });
  }

  getPackages() {
    const { searchQuery } = this.state;
    let movies = this.state.packages;
    if (searchQuery) {
      movies = this.state.packages.filter((m) =>
        m.handoverTo.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    movies = _.orderBy(
      movies,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    return movies;
  }
  render() {
    const movies = this.getPackages();
    return (
      <React.Fragment>
        <h2 className="m-4 text-center">All Packages</h2>
        <input
          type="text"
          className="form-control"
          placeholder="Search by name..."
          value={this.state.searchQuery}
          onChange={this.handleSearch}
        />
        <br />
        <table className="table">
          <thead>
            <tr>
              {this.columns.map((colmn) => (
                <th
                  key={colmn.path}
                  className="clickable"
                  onClick={() => this.handleSort(colmn.path)}
                >
                  {colmn.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {movies.map((p) => (
              <tr key={p.barcodeId}>
                {this.columns.map((colmn) => (
                  <td key={colmn.path + p.barcodeId}>{p[colmn.path]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default AllPackages;
