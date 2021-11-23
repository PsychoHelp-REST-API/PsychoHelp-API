export class RescheduleRequestDto {
  constructor(
    public readonly patientId: string,
    public readonly psychologistId: string,
    public readonly date: string,
    public readonly reasonConsultation: string,
  ) {
  }
}