import { Column } from "typeorm";

export class DateTypeORM {
  @Column('date', { name: 'date', nullable: true })
  public date: string;

  private constructor(date: string) {
    this.date = date;
  }

  public static from(date: string): DateTypeORM  {
    return new DateTypeORM (date);
  }
}