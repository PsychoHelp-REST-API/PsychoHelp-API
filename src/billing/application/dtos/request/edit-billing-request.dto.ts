export class EditBillingRequestDto {
  constructor(
    // TODO: implementar nombre del paciente
    public readonly code: string,
    public readonly description: string,
    public readonly amount: number,
    public readonly dateTime: string,
  ) {}
}