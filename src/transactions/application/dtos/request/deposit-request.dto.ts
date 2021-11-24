export class DepositRequestDto {
  constructor(
    public readonly paymentNumber: string,
    public readonly amount: number,
  ) {}
}
