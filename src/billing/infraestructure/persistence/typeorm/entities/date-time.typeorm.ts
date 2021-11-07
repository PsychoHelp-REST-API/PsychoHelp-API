import { Column } from "typeorm";

export class DateTimeTypeORM {
  @Column('datetime', {name: 'date', nullable: false})
  public dateTime: string;

  private constructor(dateTime: string) {
    this.dateTime = dateTime;
  }

  public static from(dateTime: string): DateTimeTypeORM  {
    return new DateTimeTypeORM (dateTime);
  }
}