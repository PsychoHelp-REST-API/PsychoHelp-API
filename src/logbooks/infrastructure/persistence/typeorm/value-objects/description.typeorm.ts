import { Column } from 'typeorm';

export class DescriptionTypeorm {
  @Column('varchar', { name: 'description', length: 50, nullable: false})
  public description: string;

  private constructor(description: string) {
    this.description = description;
  }

  public static from(description: string): DescriptionTypeorm  {
    return new DescriptionTypeorm (description);
  }
}
