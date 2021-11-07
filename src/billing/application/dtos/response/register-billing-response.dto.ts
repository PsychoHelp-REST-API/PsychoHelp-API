export class RegisterBillingResponseDto {
  constructor(
    public id: number,
    // TODO: implementar nombre del paciente
    public readonly code: string,
    public readonly description: string,
    public readonly amount: number,
    public readonly dateTime: string,
  ) {}
}