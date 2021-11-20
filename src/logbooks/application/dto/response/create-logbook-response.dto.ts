export class CreateLogbookResponseDto{
  constructor(
    public readonly id: number,
    public readonly patientId: number,
    public readonly consultationReason: string,
    public readonly description: string
  ) {}

}