import * as React from 'react';
import * as _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import * as config from '../../config';
import { AllPackagesState } from './all-packages.state';
import { Package } from './../../models/package.model';
import { paginate } from './../../utils/paginate';
import Pagination from '../../components/pagination';
import FilterGroup from '../../components/FilterGroup';
import { Table } from '../../components/table/table';

class AllPackages extends React.Component<{}, AllPackagesState> {
  constructor(props: {}) {
    super(props);

    this.state = new AllPackagesState();
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.renderSortIcon = this.renderSortIcon.bind(this);
  }

  async componentDidMount() {
    await fetch(config.apiUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const packages: Package[] = JSON.parse(JSON.stringify(data));
        this.setState({ packages });
      })
      .catch((err) => {
        if (err) {
          toast.error('something went wrong');
        }
      });
  }

  handleSearch({ currentTarget }: React.FormEvent<HTMLInputElement>): void {
    this.setState({ searchQuery: currentTarget.value });
  }

  handleSort(path: string): void {
    const sortOrder = this.state.sortColumn.order;
    this.setState({
      sortColumn: { path, order: sortOrder === 'asc' ? 'desc' : 'asc' }
    });
  }

  handlePageChange(page: number): void {
    this.setState({ currentPage: page });
  }

  handleFilter(selectedFilter: string): void {
    this.setState({ selectedFilter });
  }

  getPackages(): { packages: Package[]; totalCount: number } {
    const { searchQuery, pageSize, currentPage } = this.state;

    let packages = this.state.packages;
    if (searchQuery) {
      packages = this.state.packages.filter(
        (m) =>
          m.handoverTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.barcodeId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    const filterd = this.filterPackages(packages);

    const sorted = _.orderBy(
      filterd,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );

    packages = paginate(sorted, currentPage, pageSize);

    return { packages, totalCount: sorted.length };
  }

  filterPackages(packages: Package[]): Package[] {
    const { selectedFilter } = this.state;
    if (selectedFilter === 'all') {
      return packages;
    } else if (selectedFilter === 'handover') {
      return packages.filter((p) => p.handoverDate);
    } else {
      return packages.filter((p) => !p.handoverDate);
    }
  }
  renderSortIcon(colmn: { title: string; path: string }): any {
    const { sortColumn } = this.state;
    if (sortColumn.path !== colmn.path) {
      return null;
    }
    if (sortColumn.order === 'asc') {
      return <FontAwesomeIcon icon={'sort-up'} />;
    }
    return <FontAwesomeIcon icon={'sort-down'} />;
  }

  render() {
    const { packages, totalCount } = this.getPackages();
    const { currentPage, pageSize, searchQuery } = this.state;

    return (
      <React.Fragment>
        <h2 className="m-4 text-center">All Packages</h2>

        <div className="row">
          <input
            type="text"
            className="form-control col-md-7"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={this.handleSearch}
          />
          <div className="col-md-5">
            <div className=" float-md-right">
              <strong>filter by : </strong>
              <FilterGroup
                items={this.state.filterList}
                onItemSelect={this.handleFilter}
                selectedItem={this.state.selectedFilter}
              />
            </div>
          </div>
        </div>

        <br />
        {totalCount === 0 && searchQuery && (
          <div className="alert alert-danger">
            There are no results for {searchQuery}
          </div>
        )}
        {totalCount !== 0 && (
          <Table
            renderSortIcon={this.renderSortIcon}
            handleSort={this.handleSort}
            packages={packages}
          />
        )}

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
