export class RegisterPsychologistRequestDto {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly dni: string,
    public readonly email: string,
    public readonly password: string,
    public readonly description: string,
  ) {}
}
