export class EditPostRequestDto {
  constructor(
    //TODO: implementar nombre del psicologo
    public readonly  title: string,
    public readonly description: string,
    public readonly image: string,
    public readonly dateTime: string,
  ) {}
}