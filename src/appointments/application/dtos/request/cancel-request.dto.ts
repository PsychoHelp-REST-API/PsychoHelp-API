export class CancelRequestDto {
  constructor(
    public readonly patientId: string,
    public readonly psychologistId: string,
    public readonly date: string,
    public readonly reasonConsultation: string,
  ) {
  }
}