import { Column } from "typeorm";

export class DateTypeORM {
  @Column('datetime', {name: 'date', nullable: true})
  public date: string;

  private constructor(date: string) {
    this.date = date;
  }

  public static from(date: string){
    return new DateTypeORM(date);
  }
}