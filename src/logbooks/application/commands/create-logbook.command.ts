export class CreateLogbookCommand{
  constructor(
    public readonly patientId: number,
    public readonly consultationReason: string,
    public readonly description: string
  ) {}
}