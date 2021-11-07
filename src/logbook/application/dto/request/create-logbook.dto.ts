//import { Name } from '../../common/domain/value-objects/name.value';

export class CreateLogbookDto {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly date: string
  ) {}
}
