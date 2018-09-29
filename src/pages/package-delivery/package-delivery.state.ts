import { Package } from './../../models/package.model';
export class PackageDeliveryState {
  barcodeId: string;
  error: string;
  deliverySucceeded: boolean;
  allPackages: Package[];

  constructor() {
    this.barcodeId = '';
    this.error = '';
    this.deliverySucceeded = false;
  }
}
