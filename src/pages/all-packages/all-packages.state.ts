import { Package } from './../../models/package.model';
export class AllPackagesState {
  packages: Package[];
  searchQuery: string;
  sortColumn: { path: string; order: string };
  currentPage: number;
  pageSize: number;
  constructor() {
    this.packages = [];
    this.searchQuery = '';
    this.sortColumn = { path: 'receivedDate', order: 'desc' };
    this.currentPage = 1;
    this.pageSize = 7;
  }
}
