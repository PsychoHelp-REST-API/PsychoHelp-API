import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PatientIdTypeORM } from "../../../../../patients/infrastructure/persistence/typeorm/value-objects/patient.id.typeorm";
import { PsychologistIdTypeORM } from "../../../../../psychologists/infrastructure/persistence/typeorm/value-objects/psychologist.id.typeorm";
import { DateTypeORM } from "../value-objects/date.typeorm";
import { AppointmentStatus } from "../../../../domain/enums/appointment.status.enum";
import { ReasonConsultationTypeORM } from "../value-objects/reason-consultation.typeorm";
import { PatientIdFromTypeorm } from "../value-objects/patient-id-from.typeorm";
import { PsychologistIdToTypeORM } from "../value-objects/psychologist-id-to.typeorm";

@Entity('appointments')
export class AppointmentTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true} )
  public id: number;

  @Column((type) => PatientIdFromTypeorm, { prefix: false })
  public patientId: PatientIdFromTypeorm;

  @Column((type) => PsychologistIdToTypeORM, { prefix: false })
  public psychologistId: PsychologistIdToTypeORM;

  @Column((type) => DateTypeORM, { prefix: false})
  public date: DateTypeORM;

  @Column('tinyint', { name: 'status', width: 2, unsigned: true, nullable: false, })
  public status: AppointmentStatus;

  @Column((type) => ReasonConsultationTypeORM, { prefix: false })
  public reasonConsultation: ReasonConsultationTypeORM;

}