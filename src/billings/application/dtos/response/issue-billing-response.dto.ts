export class IssueBillingResponseDto {
  constructor(
    public id: number,
    public readonly patientId: number,
    public readonly code: string,
    public readonly amount: number,
    public readonly description: string,
    public readonly date: string,
  ) {}
}