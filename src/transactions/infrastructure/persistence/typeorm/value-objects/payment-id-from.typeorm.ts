import { Column } from 'typeorm';

export class PaymentIdFromTypeORM {
  @Column('bigint', { name: 'payment_id_from', unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): PaymentIdFromTypeORM {
    return new PaymentIdFromTypeORM(value);
  }
}
