import { Column } from 'typeorm';

export class PaymentIdToTypeORM {
  @Column('bigint', { name: 'payment_id_to', nullable: true, unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): PaymentIdToTypeORM {
    return new PaymentIdToTypeORM(value);
  }
}
