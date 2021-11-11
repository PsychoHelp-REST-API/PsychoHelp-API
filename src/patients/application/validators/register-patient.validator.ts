import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientTypeORM } from '../../infrastructure/persistence/typeorm/entities/patient.typeorm';
import { Repository } from 'typeorm';
import { RegisterPatientRequestDto } from '../dtos/request/register-patient-request.dto';
import { AppNotification } from '../../../common/application/app.notification';

@Injectable()
export class RegisterPatientValidator {
  constructor(
    @InjectRepository(PatientTypeORM)
    private patientRepository: Repository<PatientTypeORM>,
  ) {}

  public async validate(
    registerPatientRequestDto: RegisterPatientRequestDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();
    const firstName: string = registerPatientRequestDto.firstName.trim();
    if (firstName.length <= 0) {
      notification.addError('Patient firstName is required', null);
    }

    const lastName: string = registerPatientRequestDto.lastName.trim();
    if (lastName.length <= 0) {
      notification.addError('Patient lastName is required', null);
    }

    const dni: string = registerPatientRequestDto.dni.trim();
    if (dni.length <= 0) {
      notification.addError('Patient dni is required', null);
    }

    const email: string = registerPatientRequestDto.email.trim();
    if (email.length <= 0) {
      notification.addError('Patient email is required', null);
    }

    const password: string = registerPatientRequestDto.password.trim();
    if (password.length <= 0) {
      notification.addError('Patient password is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const patient: PatientTypeORM = await this.patientRepository
      .createQueryBuilder()
      .where('dni = :dni', { dni })
      .getOne();
    if (patient != null) {
      notification.addError('Patient dni is taken', null);
    }
    return notification;
  }
}
