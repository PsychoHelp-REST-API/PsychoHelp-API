import { Column } from "typeorm";

export class AccountNumberTypeORM {
  @Column('varchar', { name: 'number', length: 10, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): AccountNumberTypeORM {
    return new AccountNumberTypeORM(value);
  }
}