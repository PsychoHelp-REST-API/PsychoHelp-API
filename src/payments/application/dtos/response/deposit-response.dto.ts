export class DepositResponseDto {
  constructor(
    public readonly paymentId: number,
    public readonly accountNumber: string,
    public readonly amount: number,
    public readonly status: string,
    public readonly createdAt: string
  ) {
  }
}