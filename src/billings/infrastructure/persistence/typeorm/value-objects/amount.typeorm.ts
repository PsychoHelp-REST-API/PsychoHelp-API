import { Column } from "typeorm";

export class AmountTypeORM {
  @Column('decimal', {name: 'amount', precision: 10, scale: 2, nullable: false})
  public amount: number;

  private constructor(amount: number) {
    this.amount = amount;
  }

  public static from(amount: number): AmountTypeORM {
    return new AmountTypeORM(amount);
  }
}