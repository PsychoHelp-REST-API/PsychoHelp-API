import { Column } from "typeorm";

export class PsychologistIdToTypeORM {
  @Column('bigint', { name: 'psychologist_id_to', nullable: true, unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): PsychologistIdToTypeORM {
    return new PsychologistIdToTypeORM(value);
  }
}