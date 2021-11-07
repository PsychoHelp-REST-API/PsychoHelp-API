import { PrimaryGeneratedColumn } from "typeorm";

export class BillingIdTypeORM {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  private constructor(id: number) {
    this.id = id;
  }

  public static from(id: number): BillingIdTypeORM {
    return new BillingIdTypeORM(id);
  }
}