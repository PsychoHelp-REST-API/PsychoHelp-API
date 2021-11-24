export class TransferResponseDto {
  constructor(
    public readonly transactionId: number,
    public readonly transactionType: string,
    public readonly fromPaymentNumber: string,
    public readonly toPaymentNumber: string,
    public readonly amount: number,
    public readonly status: string,
    public readonly createdAt: string,
  ) {}
}
