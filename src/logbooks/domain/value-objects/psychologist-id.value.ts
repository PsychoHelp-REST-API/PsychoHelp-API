
export class PatientId {
  private value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static of(value: number): PatientId {
    return new PatientId(value);
  }
  public static create(value: number) {
    return new PatientId(value);
  }
  public getValue(): number {
    return this.value;
  }

}