export class OpenAccountResponse {
  constructor(
    public id: number,
    public number: string,
    public balance: number,
    public psychologistId: number
  ) {}
}