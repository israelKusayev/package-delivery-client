export class AddPackageState {
  barcodeId: string;
  handoverTo: string;
  errors: { barcodeIdError: string; handoverToError: string };

  constructor() {
    this.barcodeId = '';
    this.handoverTo = '';
    this.errors = { barcodeIdError: '', handoverToError: '' };
  }
}
