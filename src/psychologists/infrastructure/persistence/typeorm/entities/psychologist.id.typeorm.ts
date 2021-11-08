import { PrimaryGeneratedColumn } from 'typeorm';

export class PsychologistIdTypeORM {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  public value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static from(value: number): PsychologistIdTypeORM {
    return new PsychologistIdTypeORM(value);
  }
}
