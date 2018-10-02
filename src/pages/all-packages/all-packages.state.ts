import { Package } from './../../models/package.model';
export class AllPAckagesState {
  packages: Package[];
  searchQuery: string;
  sortColumn: { path: string; order: string };
  constructor() {
    this.packages = [];
    this.searchQuery = '';
    this.sortColumn = { path: 'receivedDate', order: 'desc' };
  }
}
