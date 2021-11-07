import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateLogbookCommand } from '../../commands/create-logbook.command';
import { InjectRepository } from '@nestjs/typeorm';
import { LogbookTypeORM } from '../../../infrastructure/persistence/typeorm/entities/logbook.typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { Name } from '../../../../common/domain/value-objects/name.value';
import { Logbook } from '../../../domain/entities/logbook.entity';
import { LogbookFactory } from '../../../domain/factories/logbook.factory';
import { LogbookMapper } from '../../mappers/logbook.mapper';
import { Id } from '../../../../common/domain/value-objects/id.value';

@CommandHandler(CreateLogbookCommand)
export class createLogbookHandler
  implements ICommandHandler<CreateLogbookCommand>{
  constructor(
    @InjectRepository(LogbookTypeORM)
    private logbookRepository: Repository<LogbookTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: CreateLogbookCommand) {
    const nameResult: Result<AppNotification, Name> = Name.create(command.firstName, command.lastName);
    if (nameResult.isFailure()) {
      return 0;
    }

    let logbook: Logbook = LogbookFactory.createFrom(nameResult.value);
    let logbookTypeORM = LogbookMapper.toTypeORM(logbook);
    logbookTypeORM = await this.logbookRepository.save(logbookTypeORM);
    if (logbookTypeORM == null) {
      return 0;
    }
    const logbookId: number = Number(logbookTypeORM.id.value);
    logbook.changeId(Id.create(logbookId));
    logbook = this.publisher.mergeObjectContext(logbook);
    logbook.create();
    logbook.commit();
    return logbookId;
  }
}