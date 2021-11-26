export class OpenAccountRequest {
  constructor(
    public readonly psychologistId: number,
    public readonly number: string
  ) {
  }
}