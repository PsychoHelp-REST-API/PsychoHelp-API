export class Id {
  private value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static of(value: number): Id {
    return new Id(value);
  }
  public static create(value: number) {
    return new Id(value);
  }
  public getValue(): number {
    return this.value;
  }
}
