import { Column } from 'typeorm';

export class PaymentNumberTypeORM {
  @Column('varchar', { name: 'number', length: 10, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): PaymentNumberTypeORM {
    return new PaymentNumberTypeORM(value);
  }
}
