export class CreateLogbookCommand{
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly date: string,
  ) {}
}