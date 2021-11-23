import { PatientId } from '../../../patients/domain/value-objects/patient-id.value';
import { PsychologistId } from '../../../psychologists/domain/value-objects/psychologist-id.value';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { AppointmentStatus } from '../enums/appointment.status.enum';
import { ReasonConsultation } from '../value-objects/reason-consultation.value';
import { Appointment } from '../entities/appointment.entity';

export class AppointmentFactory {
  public static createFrom(
    patientId: PatientId,
    psychologistId: PsychologistId,
    date: DateTime,
    status: AppointmentStatus,
    reasonConsultation: ReasonConsultation,
  ): Appointment {
    return new Appointment(
      patientId,
      psychologistId,
      date,
      status,
      reasonConsultation,
    );
  }
}
