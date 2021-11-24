export class PaymentOpened {
  constructor(
    public readonly id: number,
    public readonly number: string,
    public readonly psychologistId: number,
  ) {}
}
