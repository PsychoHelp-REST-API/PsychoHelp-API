import { Column } from 'typeorm';

export class ConsultationReasonTypeORM{
  @Column('varchar', {name: 'consultation_reason', nullable: true})
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static from(value: string): ConsultationReasonTypeORM {
    return new ConsultationReasonTypeORM(value);
  }
}