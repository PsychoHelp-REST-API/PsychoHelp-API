import { Column } from 'typeorm';

export class PasswordTypeORM {
  @Column('varchar', { name: 'password', length: 12, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): PasswordTypeORM {
    return new PasswordTypeORM(value);
  }
}
