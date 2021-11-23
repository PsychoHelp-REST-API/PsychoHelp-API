export class CancelResponseDto {
  constructor(
    public readonly id: number,
    public readonly patientId: string,
    public readonly psychologistId: string,
    public readonly status: string,
    public readonly date: string,
    public readonly reasonConsultation: string,
    public createdAt: string
  ) {
  }
}