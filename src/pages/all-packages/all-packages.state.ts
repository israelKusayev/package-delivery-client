import { Package } from './../../models/package.model';
export class AllPackagesState {
  packages: Package[];
  searchQuery: string;
  sortColumn: { path: string; order: string };
  currentPage: number;
  pageSize: number;
  selectedFilter: string;
  filterList: string[];

  constructor() {
    this.packages = [];
    this.searchQuery = '';
    this.sortColumn = { path: 'receivedDate', order: 'desc' };
    this.currentPage = 1;
    this.pageSize = 7;
    this.selectedFilter = 'all';
    this.filterList = ['not handover yet', 'handover', 'all'];
  }
}
