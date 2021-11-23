import { AggregateRoot } from '@nestjs/cqrs';
import { AppointmentId } from '../value-objects/appointment-id.value';
import { PatientId } from '../../../patients/domain/value-objects/patient-id.value';
import { PsychologistId } from '../../../psychologists/domain/value-objects/psychologist-id.value';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { ReasonConsultation } from '../value-objects/reason-consultation.value';
import { ScheduleAppointment } from '../events/schedule-appointment.event';
import { AppointmentStatus } from '../enums/appointment.status.enum';
import { RescheduleAppointment } from '../events/reschedule-appointment.event';
import { CancelAppointment } from '../events/cancel-appointment.event';

export class Appointment extends AggregateRoot {
  private id: AppointmentId;
  private readonly patientId: PatientId;
  private readonly psychologistId: PsychologistId;
  private readonly date: DateTime;
  private readonly status: AppointmentStatus;
  private readonly reasonConsultation: ReasonConsultation;

  public constructor(
    patientId: PatientId,
    psychologistId: PsychologistId,
    date: DateTime,
    status: AppointmentStatus,
    reasonConsultation: ReasonConsultation,
  ) {
    super();
    this.patientId = patientId;
    this.psychologistId = psychologistId;
    this.date = date;
    this.status = status;
    this.reasonConsultation = reasonConsultation;
  }

  public schedule() {
    const event = new ScheduleAppointment(
      this.id.getValue(),
      this.patientId.getValue(),
      this.psychologistId.getValue(),
      this.status,
      this.date,
      this.reasonConsultation.getValue(),
      null
    );
    this.apply(event);
  }

  public reschedule() {
    const event = new RescheduleAppointment(
      this.id.getValue(),
      this.patientId.getValue(),
      this.psychologistId.getValue(),
      this.status,
      this.date,
      this.reasonConsultation.getValue(),
      null
    );
    this.apply(event);
  }

  public cancel() {
    const event = new CancelAppointment(
      this.id.getValue(),
      this.patientId.getValue(),
      this.psychologistId.getValue(),
      this.status,
      this.date,
      this.reasonConsultation.getValue(),
      null
    );
    this.apply(event);
  }

  public getId(): AppointmentId {
    return this.id;
  }

  public getPatientId(): PatientId {
    return this.patientId;
  }

  public getPsychologistId(): PsychologistId {
    return this.psychologistId;
  }

  public getDate(): DateTime {
    return this.date;
  }

  public getStatus(): AppointmentStatus {
    return this.status;
  }

  public getReasonConsultation(): ReasonConsultation {
    return this.reasonConsultation;
  }

  public changeId(id: AppointmentId) {
    this.id = id;
  }
}
