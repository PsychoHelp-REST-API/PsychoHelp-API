export class Id {
  protected value: number;

  protected constructor(value: number) {
    this.value = value;
  }

  public static of(value: number): Id {
    return new Id(value);
  }

  public static create(value: number) {
    return new Id(value);
  }

  public getValue(): number{
    return Number(this.value);
  }
}

