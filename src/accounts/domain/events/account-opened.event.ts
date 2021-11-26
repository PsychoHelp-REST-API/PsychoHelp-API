export class AccountOpened {
  constructor(
    public readonly id: number,
    public readonly number: string,
    public readonly psychologistId: number,
  ) {
  }
}