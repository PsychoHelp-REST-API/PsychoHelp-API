import { Column } from "typeorm";

export class DescriptionTypeORM {
  @Column('text', {name: 'description', nullable: false})
  public description: string;

  private constructor(description: string) {
    this.description = description;
  }

  public static from(description: string): DescriptionTypeORM {
    return new DescriptionTypeORM(description);
  }
}