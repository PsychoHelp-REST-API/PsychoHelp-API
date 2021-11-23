import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { ScheduleAppointmentCommand } from "../../commands/schedule-appointment.command";
import { InjectRepository } from "@nestjs/typeorm";
import { PsychologistTypeORM } from "../../../../psychologists/infrastructure/persistence/typeorm/entities/psychologist.typeorm";
import { Repository } from "typeorm";
import { PatientTypeORM } from "../../../../patients/infrastructure/persistence/typeorm/entities/patient.typeorm";
import { AppointmentTypeORM } from "../../../infrastructure/persistence/typeorm/entities/appointment.typeorm";
import { PatientId } from "../../../../patients/domain/value-objects/patient-id.value";
import { PsychologistId } from "../../../../psychologists/domain/value-objects/psychologist-id.value";
import { ReasonConsultation } from "../../../domain/value-objects/reason-consultation.value";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../common/application/app.notification";
import { Appointment } from "../../../domain/entities/appointment.entity";
import { AppointmentFactory } from "../../../domain/factories/apppointment.factory";
import { AppointmentStatus } from "../../../domain/enums/appointment.status.enum";
import { AppointmentMapper } from "../../mappers/appointment.mapper";
import { AppointmentId } from "../../../domain/value-objects/appointment-id.value";
import { DateTime } from "../../../../common/domain/value-objects/date-time.value";

@CommandHandler(ScheduleAppointmentCommand)
export class ScheduleAppointmentHandler implements ICommandHandler<ScheduleAppointmentCommand>{
  constructor(
    @InjectRepository(PatientTypeORM)
    private patientRepository: Repository<PatientTypeORM>,
    @InjectRepository(PsychologistTypeORM)
    private psychologistRepository: Repository<PsychologistTypeORM>,
    @InjectRepository(AppointmentTypeORM)
    private appointmentRepository: Repository<AppointmentTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: ScheduleAppointmentCommand){
    let appointmentId: number = 0;
    const patientId: string = command.patientId;
    const fromPatientTypeORM: PatientTypeORM = await this.patientRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .useTransaction(true)
      .where("id = :id")
      .setParameter("id", patientId)
      .getOne();
    if(fromPatientTypeORM == null){
      return appointmentId;
    }

    const psychologistId: string = command.psychologistId;
    const toPsychologistTypeORM: PsychologistTypeORM = await this.psychologistRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .useTransaction(true)
      .where("id = :id")
      .setParameter("id", psychologistId)
      .getOne();

    if(toPsychologistTypeORM == null) {
      return appointmentId;
    }

    const patientIdFrom: PatientId = PatientId.create(fromPatientTypeORM.id);
    const psychologistIdTo: PsychologistId = PsychologistId.create(toPsychologistTypeORM.id);
    //const date: DateTime = DateTime.from(DateTime.fromString(command.date));
    const reasonConsultation: Result<AppNotification, ReasonConsultation> =
      ReasonConsultation.create(command.reasonConsultation);
    if (reasonConsultation.isFailure()) {
      return 0;
    }

    let appointment: Appointment = AppointmentFactory.createFrom(patientIdFrom, psychologistIdTo, null,AppointmentStatus.PENDING, reasonConsultation.value);
    let appointmentTypeORM: AppointmentTypeORM = AppointmentMapper.toTypeORM(appointment);
    appointmentTypeORM = await this.appointmentRepository.save(appointmentTypeORM);

    if(appointmentTypeORM == null){
      return appointmentId;
    }

    appointmentId = Number(appointmentTypeORM.id);
    appointment.changeId(AppointmentId.of(appointmentId));
    appointment = this.publisher.mergeObjectContext(appointment);
    appointment.schedule();
    appointment.commit();
    return appointmentId;

  }
}