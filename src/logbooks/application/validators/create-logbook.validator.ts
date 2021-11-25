import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogbookTypeORM } from '../../infrastructure/persistence/typeorm/entities/logbook.typeorm';
import { Repository } from 'typeorm';
import { CreateLogbookDto } from '../dto/request/create-logbook.dto';
import { AppNotification } from '../../../common/application/app.notification';
import { PatientTypeORM } from "../../../patients/infrastructure/persistence/typeorm/entities/patient.typeorm";

@Injectable()
export class CreateLogbookValidator{
  constructor(
    @InjectRepository(PatientTypeORM)
    private patientRepository: Repository<PatientTypeORM>,
    @InjectRepository(LogbookTypeORM)
    private logbookRepository: Repository<LogbookTypeORM>,
  ) {}

  public async validate(
    createLogbookDTO: CreateLogbookDto,
  ): Promise<AppNotification>{
    const notification: AppNotification = new AppNotification();
    console.log(createLogbookDTO.consultationReason);
    const patientIdFrom: number = createLogbookDTO.patientId;
    if (patientIdFrom == null ) {
      notification.addError('PatientId is required', null);
    }
    const consultationReason: string = createLogbookDTO.consultationReason.trim();
    if (consultationReason.length <= 0) {
      notification.addError('Logbook consultation reason is required', null);
    }
    const description: string = createLogbookDTO.description.trim();
    if (description.length <= 0) {
      notification.addError('Logbook description is required', null);
    }
    const fromPatientTypeORM: PatientTypeORM = await this.patientRepository.createQueryBuilder()
      .where("id = :id")
      .setParameter("id", patientIdFrom)
      .getOne();
    if(fromPatientTypeORM == null){
      notification.addError('From patient Id not found', null);
    }

    const patientIdTypeORM: LogbookTypeORM = await this.logbookRepository.createQueryBuilder()
      .where("patient_id = :patientIdFrom", { patientIdFrom })
      .getOne();
    if (patientIdTypeORM != null) {
      notification.addError('Patient is taken', null);
    }
    return notification;
  }
}