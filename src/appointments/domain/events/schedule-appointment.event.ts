import { AppointmentStatus } from "../enums/appointment.status.enum";
import { DateTime } from "../../../common/domain/value-objects/date-time.value";

export class ScheduleAppointment{
  constructor(
    private readonly appointmentId: number,
    private readonly patientId: number,
    public readonly psychologistId: number,
    public readonly status: AppointmentStatus,
    public readonly date: DateTime,
    public readonly reasonConsultation: string,
    public readonly createdAt: DateTime
  ) {
  }
}