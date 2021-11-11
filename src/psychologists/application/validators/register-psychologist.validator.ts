import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PsychologistTypeORM } from '../../infrastructure/persistence/typeorm/entities/psychologist.typeorm';
import { Repository } from 'typeorm';
import { RegisterPsychologistRequestDto } from '../dtos/request/register-psychologist-request.dto';
import { AppNotification } from '../../../common/application/app.notification';

@Injectable()
export class RegisterPsychologistValidator {
  constructor(
    @InjectRepository(PsychologistTypeORM)
    private psychologistRepository: Repository<PsychologistTypeORM>,
  ) {}

  public async validate(
    registerPsychologistRequestDto: RegisterPsychologistRequestDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();
    const firstName: string = registerPsychologistRequestDto.firstName.trim();
    if (firstName.length <= 0) {
      notification.addError('Psychologist firstName is required', null);
    }

    const lastName: string = registerPsychologistRequestDto.lastName.trim();
    if (lastName.length <= 0) {
      notification.addError('Psychologist lastName is required', null);
    }

    const dni: string = registerPsychologistRequestDto.dni.trim();
    if (dni.length <= 0) {
      notification.addError('Psychologist dni is required', null);
    }

    const email: string = registerPsychologistRequestDto.email.trim();
    if (email.length <= 0) {
      notification.addError('Psychologist email is required', null);
    }

    const password: string = registerPsychologistRequestDto.password.trim();
    if (password.length <= 0) {
      notification.addError('Psychologist password is required', null);
    }

    const description: string =
      registerPsychologistRequestDto.description.trim();
    if (description.length <= 0) {
      notification.addError('Psychologist dni is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    const psychologist: PsychologistTypeORM = await this.psychologistRepository
      .createQueryBuilder()
      .where('dni = :dni', { dni })
      .getOne();
    if (psychologist != null) {
      notification.addError('Psychologist dni is taken', null);
    }
    return notification;
  }
}
