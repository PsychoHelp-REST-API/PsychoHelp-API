export class WithdrawRequestDto {
  constructor(
    public readonly paymentNumber: string,
    public readonly amount: number,
  ) {}
}
