import { Column } from 'typeorm';

export class ReasonConsultationTypeORM{
  @Column('varchar', { name: 'reason_consultation', length: 250, nullable: false })
  value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): ReasonConsultationTypeORM {
    return new ReasonConsultationTypeORM(value);
  }
}
