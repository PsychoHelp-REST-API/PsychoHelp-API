export class BillingId {
  private readonly id: number;

  private constructor(id: number) {
    this.id = id;
  }

  public static createBillId(id: number) {
    return new BillingId(id);
  }

  public getBillId(): number {
    return this.id;
  }
}