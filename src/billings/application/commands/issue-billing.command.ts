export class IssueBillingCommand {
  constructor(
    public readonly patientId: number,
    public readonly code: string,
    public readonly amount: number,
    public readonly description: string,
    public readonly date: string,
  ){}
}