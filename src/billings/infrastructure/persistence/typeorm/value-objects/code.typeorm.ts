import { Column } from "typeorm";

export class CodeTypeORM {
  @Column('varchar', {name: 'code', length: 8, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): CodeTypeORM {
    return new CodeTypeORM(value);
  }
}