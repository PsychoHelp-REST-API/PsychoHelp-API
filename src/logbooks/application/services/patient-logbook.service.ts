import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';


@Injectable()
export class PatientLogbookService{
  constructor(
    private commandBus: CommandBus,
  ) {}

}