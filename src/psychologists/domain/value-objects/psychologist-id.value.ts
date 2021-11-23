export class PsychologistId {
  private readonly value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static create(value: number): PsychologistId {
    return new PsychologistId(value);
  }

  public getValue(): number {
    return this.value;
  }
}
