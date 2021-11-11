export class RegisterPatientResponseDto {
  constructor(
    public id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly dni: string,
    public readonly email: string,
    public readonly password: string,
  ) {}
}
