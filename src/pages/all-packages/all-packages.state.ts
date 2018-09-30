import { Package } from './../../models/package.model';
export class AllPAckagesState {
  packages: Package[];
  constructor() {
    this.packages = [];
  }
}
