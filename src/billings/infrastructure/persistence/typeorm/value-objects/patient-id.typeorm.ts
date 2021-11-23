import { Column } from "typeorm";

export class PatientIdTypeORM {
  @Column('bigint', {name:'patient_id', unsigned: true})
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): PatientIdTypeORM {
    return new PatientIdTypeORM(value);
  }
}