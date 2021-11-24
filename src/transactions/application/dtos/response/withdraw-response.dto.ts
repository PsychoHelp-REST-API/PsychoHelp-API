export class WithdrawResponseDto {
  constructor(
    public readonly transactionId: number,
    public readonly transactionType: string,
    public readonly paymentNumber: string,
    public readonly amount: number,
    public readonly status: string,
    public readonly createdAt: string,
  ) {}
}
