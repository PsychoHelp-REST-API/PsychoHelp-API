import { Column } from "typeorm";

export class AmountTypeORM {
  @Column('money', {name: 'amount', nullable: false})
  public amount: number;

  private constructor(amount: number) {
    this.amount = amount;
  }

  public static from(amount: number): AmountTypeORM {
    return new AmountTypeORM(amount);
  }
}