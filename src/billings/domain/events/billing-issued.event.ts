export class BillingIssuedEvent {
  constructor(
    public readonly id: number,
    public readonly patientId: number,
    public readonly code: string,
    public readonly amount: number,
    public readonly description: string,
    public readonly date: string
  ) {}
}