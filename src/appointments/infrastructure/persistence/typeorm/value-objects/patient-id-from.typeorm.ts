import { Column } from "typeorm";

export class PatientIdFromTypeorm {
  @Column('bigint', { name: 'patient_id_from', unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): PatientIdFromTypeorm {
    return new PatientIdFromTypeorm(value);
  }
}