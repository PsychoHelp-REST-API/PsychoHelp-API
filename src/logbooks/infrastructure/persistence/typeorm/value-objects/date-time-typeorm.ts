import { Column } from 'typeorm';

export class DateTimeTypeorm {
  @Column('datetime', {name: 'date', nullable: false})
  public dateTime: string;

  private constructor(dateTime: string) {
    this.dateTime = dateTime;
  }

  public static from(dateTime: string): DateTimeTypeorm  {
    return new DateTimeTypeorm (dateTime);
  }
}