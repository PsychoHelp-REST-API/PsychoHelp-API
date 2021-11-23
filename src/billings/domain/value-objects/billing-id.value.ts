export class BillingId {
  private readonly value: number;

  private constructor(id: number) {
    this.value = Number(id);
  }

  public static createBillId(id: number): BillingId {
    return new BillingId(id);
  }

  public getValue(): number {
    return Number(this.value);
  }
}