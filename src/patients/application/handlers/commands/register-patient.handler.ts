import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RegisterPatientCommand } from '../../commands/register-patient.command';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { Dni } from '../../../../psychologists/domain/value-objects/dni.value';
import { Name } from '../../../../common/domain/value-objects/name.value';
import { Email } from '../../../../common/domain/value-objects/email.value';
import { Password } from '../../../../psychologists/domain/value-objects/password.value';
import { Patient } from '../../../domain/entities/patient.entity';
import { PatientFactory } from '../../../domain/factories/patient.factory';
import { PatientMapper } from '../../mappers/patient.mapper';
import { PatientId } from '../../../domain/value-objects/patient-id.value';
import { PatientTypeORM } from '../../../infrastructure/persistence/typeorm/entities/patient.typeorm';

@CommandHandler(RegisterPatientCommand)
export class RegisterPatientHandler
  implements ICommandHandler<RegisterPatientCommand>
{
  constructor(
    @InjectRepository(PatientTypeORM)
    private patientRepository: Repository<PatientTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterPatientCommand) {
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

    let patient: Patient = PatientFactory.createForm(
      nameResult.value,
      dniResult.value,
      emailResult.value,
      passwordResult.value,
    );
    let patientTypeORM = PatientMapper.toTypeORM(patient);
    patientTypeORM = await this.patientRepository.save(patientTypeORM);
    if (patientTypeORM == null) {
      return 0;
    }

    const patientId = Number(patientTypeORM.id.value);
    patient.changeId(PatientId.create(patientId));
    patient = this.publisher.mergeObjectContext(patient);
    patient.register();
    patient.commit();
    return patientId;
  }
}
