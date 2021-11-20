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
import { PatientId } from '../../../domain/value-objects/psychologist-id.value';
import { ConsultationReason } from '../../../domain/value-objects/consultation-reason.value';
import { Description } from '../../../domain/value-objects/description.value';

@CommandHandler(CreateLogbookCommand)
export class CreateLogbookHandler
  implements ICommandHandler<CreateLogbookCommand>{
  constructor(
    @InjectRepository(LogbookTypeORM)
    private logbookRepository: Repository<LogbookTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: CreateLogbookCommand) {
    const consultationReason: Result<AppNotification, ConsultationReason> = ConsultationReason.create(command.consultationReason);
    if (consultationReason.isFailure()){
      return 0;
    }
    const description: Result<AppNotification, Description> = Description.create(command.consultationReason);
    if (description.isFailure()){
      return 0;
    }
    const patientId: PatientId = PatientId.of(command.patientId);
    let logbook: Logbook = LogbookFactory.createFrom(consultationReason.value,description.value,patientId);
    let logbookTypeORM = LogbookMapper.toTypeORM(logbook);
    logbookTypeORM = await this.logbookRepository.save(logbookTypeORM);
    if (logbookTypeORM == null) {
      return 0;
    }
    const logbookId = Number(logbookTypeORM.id.value);
    logbook.changeId(Id.create(logbookId));
    logbook = this.publisher.mergeObjectContext(logbook);
    logbook.create();
    logbook.commit();
    return logbookId;
  }
}