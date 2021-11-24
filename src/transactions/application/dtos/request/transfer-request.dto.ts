export class TransferRequestDto {
  constructor(
    public readonly fromPaymentNumber: string,
    public readonly toPaymentNumber: string,
    public readonly amount: number,
  ) {}
}
