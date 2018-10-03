export class PackageDeliveryState {
  barcodeId: string;
  previousBarcodeId: string; // for message
  error: string;
  deliverySucceeded: boolean;

  constructor() {
    this.barcodeId = '';
    this.error = '';
    this.deliverySucceeded = false;
  }
}
