export class RegisterBillingCommand {
  constructor(
    // TODO: implementar nombre del paciente en el comando
    public readonly code: string,
    public readonly description: string,
    public readonly amount: number,
    public readonly dateTime: string,
  ){}
}