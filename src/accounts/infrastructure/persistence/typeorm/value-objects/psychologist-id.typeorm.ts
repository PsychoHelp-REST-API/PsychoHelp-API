import { Column } from 'typeorm';

export class PsychologistIdTypeORM {
  @Column('bigint', { name: 'psychologist_id', unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): PsychologistIdTypeORM {
    return new PsychologistIdTypeORM(value);
  }
}