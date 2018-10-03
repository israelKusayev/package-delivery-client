import * as React from 'react';
import * as _ from 'lodash';
import * as moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as config from '../../config';
import { AllPackagesState } from './all-packages.state';
import { Package } from './../../models/package.model';
import { paginate } from './../../utils/paginate';
import Pagination from '../../components/pagination';

class AllPackages extends React.Component<any, AllPackagesState> {
  columns = [
    { path: 'barcodeId', title: 'Barcode-Id' },
    { path: 'handoverTo', title: 'Name' },
    {
      path: 'receivedDate',
      title: 'Received Date',
      content: (p: Package) => {
        return p.receivedDate
          ? moment(p.receivedDate).format('YYYY[/]MM/DD HH[:]mm A')
          : null;
      }
    },
    {
      path: 'handoverDate',
      title: 'handover Date',
      content: (p: Package) => {
        return p.handoverDate
          ? moment(p.handoverDate).format('YYYY[/]MM/DD HH[:]mm A')
          : null;
      }
    }
  ];

  constructor(props: any) {
    super(props);
    this.state = new AllPackagesState();
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  async componentDidMount() {
    await fetch(config.apiUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const packages: Package[] = JSON.parse(JSON.stringify(data));
        this.setState({ ...this.state, packages });
        console.log();
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
    const sorted = (movies = _.orderBy(
      movies,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    ));
    const { pageSize, currentPage } = this.state;
    movies = paginate(sorted, currentPage, pageSize);

    return { movies, totalCount: sorted.length };
  }

  renderSortIcon(colmn: { title: string; path: string }) {
    const { sortColumn } = this.state;
    if (sortColumn.path !== colmn.path) {
      return null;
    }
    if (sortColumn.order === 'asc') {
      return <FontAwesomeIcon icon={'sort-up'} />;
    }
    return <FontAwesomeIcon icon={'sort-down'} />;
  }

  handlePageChange(page: number) {
    this.setState({ currentPage: page });
  }
  render() {
    const { movies, totalCount } = this.getPackages();
    const { currentPage, pageSize, searchQuery } = this.state;
    return (
      <React.Fragment>
        <h2 className="m-4 text-center">All Packages</h2>

        <input
          type="text"
          className="form-control"
          placeholder="Search by name..."
          value={searchQuery}
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
                  {this.renderSortIcon(colmn)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {movies.map((p) => (
              <tr key={p.barcodeId}>
                {this.columns.map((colmn) => (
                  <td key={colmn.path + p.barcodeId}>
                    {colmn.content ? colmn.content(p) : p[colmn.path]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          itemsCount={totalCount}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default AllPackages;
