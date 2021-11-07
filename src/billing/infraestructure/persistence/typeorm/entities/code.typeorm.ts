import { Column } from "typeorm";

export class CodeTypeORM {
  @Column('varchar', {name: 'billingCode', length: 9, nullable: false })
  billingCode: string;

  private constructor(billingCode: string) {
    this.billingCode = billingCode;
  }

  public static from(billingCode: string): CodeTypeORM {
    return new CodeTypeORM(billingCode);
  }
}