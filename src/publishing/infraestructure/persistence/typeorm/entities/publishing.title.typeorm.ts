import { Column } from 'typeorm';

export class TitleTypeORM {
  @Column('string', { name: 'title', nullable: false })
  public title: string;

  private constructor(title: string) {
    this.title = title;
  }

  public static from(title: string): TitleTypeORM {
    return new TitleTypeORM(title);
  }
}
