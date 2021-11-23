import { Appointment } from "../../domain/entities/appointment.entity";
import { AppointmentTypeORM } from "../../infrastructure/persistence/typeorm/entities/appointment.typeorm";
import { PatientIdTypeORM } from "../../../patients/infrastructure/persistence/typeorm/entities/patient.id.typeorm";
import { PsychologistIdTypeORM } from "../../../psychologists/infrastructure/persistence/typeorm/entities/psychologist.id.typeorm";
import { ReasonConsultationTypeORM } from "../../infrastructure/persistence/typeorm/entities/reason-consultation.typeorm";
import { DateTypeORM } from "../../infrastructure/persistence/typeorm/entities/date.typeorm";
import { PatientIdFromTypeorm } from "../../infrastructure/persistence/typeorm/entities/patient-id-from.typeorm";
import { PsychologistIdToTypeORM } from "../../infrastructure/persistence/typeorm/entities/psychologist-id-to.typeorm";

export class AppointmentMapper {
  public static toTypeORM(appointment: Appointment): AppointmentTypeORM {
    const appointmentTypeORM: AppointmentTypeORM = new AppointmentTypeORM();
    appointmentTypeORM.patientId = PatientIdFromTypeorm.from(appointment.getPatientId().getValue());
    appointmentTypeORM.psychologistId = PsychologistIdToTypeORM.from(appointment.getPsychologistId().getValue());
    appointmentTypeORM.status = appointment.getStatus();
    const date: string = appointment.getDate() != null && appointment.getDate() != null ? appointment.getDate().format() : null;
    appointmentTypeORM.date = DateTypeORM.from(date);
    appointmentTypeORM.reasonConsultation = ReasonConsultationTypeORM.from(appointment.getReasonConsultation().getValue());
    return appointmentTypeORM;
  }
}