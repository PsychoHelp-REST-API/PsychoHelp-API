export class LogbookCreateEvent {
  constructor(
    public readonly id: number,
    public readonly consultationReason: string,
    public readonly description: string,
    public readonly patientId: number
  ) { }
}