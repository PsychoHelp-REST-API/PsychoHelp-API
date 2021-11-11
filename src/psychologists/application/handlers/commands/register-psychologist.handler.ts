import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterPsychologistCommand } from '../../commands/register-psychologist.command';
import { InjectRepository } from '@nestjs/typeorm';
import { PsychologistTypeORM } from '../../../infrastructure/persistence/typeorm/entities/psychologist.typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { Dni } from '../../../domain/value-objects/dni.value';
import { Name } from '../../../../common/domain/value-objects/name.value';
import { Email } from '../../../../common/domain/value-objects/email.value';
import { Password } from '../../../domain/value-objects/password.value';
import { Description } from '../../../domain/value-objects/description.value';
import { Psychologist } from '../../../domain/entities/psychologist.entity';
import { PsychologistFactory } from '../../../domain/factories/psychologist.factory';
import { PsychologistMapper } from '../../mappers/psychologist.mapper';
import { PsychologistId } from '../../../domain/value-objects/psychologist-id.value';

@CommandHandler(RegisterPsychologistCommand)
export class RegisterPsychologistHandler
  implements ICommandHandler<RegisterPsychologistCommand>
{
  constructor(
    @InjectRepository(PsychologistTypeORM)
    private psychologistRepository: Repository<PsychologistTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterPsychologistCommand) {
    const dniResult: Result<AppNotification, Dni> = Dni.create(command.dni);
    if (dniResult.isFailure()) {
      return 0;
    }

    const nameResult: Result<AppNotification, Name> = Name.create(
      command.firstName,
      command.lastName,
    );
    if (nameResult.isFailure()) {
      return 0;
    }

    const emailResult: Result<AppNotification, Email> = Email.create(
      command.email,
    );
    if (emailResult.isFailure()) {
      return 0;
    }

    const passwordResult: Result<AppNotification, Password> = Password.create(
      command.password,
    );
    if (passwordResult.isFailure()) {
      return 0;
    }

    const descriptionResult: Result<AppNotification, Description> =
      Description.create(command.description);
    if (descriptionResult.isFailure()) {
      return 0;
    }

    let psychologist: Psychologist = PsychologistFactory.createFrom(
      nameResult.value,
      dniResult.value,
      emailResult.value,
      passwordResult.value,
      descriptionResult.value,
    );
    let psychologistTypeORM = PsychologistMapper.toTypeORM(psychologist);
    psychologistTypeORM = await this.psychologistRepository.save(
      psychologistTypeORM,
    );
    if (psychologistTypeORM == null) {
      return 0;
    }

    const psychologistId = Number(psychologistTypeORM.id.value);
    psychologist.changeId(PsychologistId.create(psychologistId));
    psychologist = this.publisher.mergeObjectContext(psychologist);
    psychologist.register();
    psychologist.commit();
    return psychologistId;
  }
}
