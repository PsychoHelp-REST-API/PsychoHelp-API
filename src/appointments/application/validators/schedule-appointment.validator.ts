import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PatientTypeORM } from "../../../patients/infrastructure/persistence/typeorm/entities/patient.typeorm";
import { Repository } from "typeorm";
import { ScheduleRequestDto } from "../dtos/request/schedule-request.dto";
import { AppNotification } from "../../../common/application/app.notification";
import { PsychologistTypeORM } from "../../../psychologists/infrastructure/persistence/typeorm/entities/psychologist.typeorm";

@Injectable()
export class ScheduleAppointmentValidator {
  constructor(@InjectRepository(PatientTypeORM) private patientRepository: Repository<PatientTypeORM>,
              @InjectRepository(PsychologistTypeORM) private psychologistRepository: Repository<PsychologistTypeORM>) {}

  public async validate(scheduleRequestDto: ScheduleRequestDto): Promise<AppNotification>{
    let notification: AppNotification = new AppNotification();
    const patientIdFrom: string = scheduleRequestDto.patientId;
    if(patientIdFrom.length <= 0){
      notification.addError('From Patient Id is required', null);
    }

    const psychologistIdTo: string = scheduleRequestDto.psychologistId;
    if(psychologistIdTo.length <= 0){
      notification.addError('To Psychologist Id is required', null);
    }

    if(notification.hasErrors()){
      return notification;
    }

    const fromPatientTypeORM: PatientTypeORM = await this.patientRepository.createQueryBuilder()
      .where("id = :id")
      .setParameter("id", patientIdFrom)
      .getOne();
    if(fromPatientTypeORM == null){
      notification.addError('From patient Id not found', null);
    }

    const toPsychologistTypeORM: PsychologistTypeORM = await this.psychologistRepository.createQueryBuilder()
      .where("id = :id")
      .setParameter("id", psychologistIdTo)
      .getOne();
    if(toPsychologistTypeORM == null) {
      notification.addError('To psychologist Id not found', null);
    }

    const reasonConsultation: string = scheduleRequestDto.reasonConsultation;
    if(reasonConsultation.length <= 0){
      notification.addError('Reason consultation is required', null);
    }

    return notification;
  }
}