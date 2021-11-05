export class Id {
  private value: number;

  private constructor(value: number) {
    this.value = value;
  }

  public static of(value: number): Id {
    return new Id(value);
  }
}