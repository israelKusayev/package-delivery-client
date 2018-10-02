export class AddPackageState {
  barcodeId: string;
  handoverTo: string;
  successMessage: string;
  errors: {};

  constructor() {
    this.barcodeId = '';
    this.handoverTo = '';
    this.successMessage = '';
    this.errors = {};
  }
}
