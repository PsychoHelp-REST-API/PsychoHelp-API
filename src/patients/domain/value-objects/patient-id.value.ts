export class PatientId {
  private readonly value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static create(value: number): PatientId {
    return new PatientId(value);
  }

  public static of(value: number): PatientId {
    return new PatientId(value);
  }

  public getValue(): number {
    return Number(this.value);
  }
}
