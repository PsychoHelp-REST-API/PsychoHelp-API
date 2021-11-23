import { AppointmentStatus } from "../../domain/enums/appointment.status.enum";
import { DateTime } from "../../../common/domain/value-objects/date-time.value";

export class ScheduleAppointmentCommand{
  constructor(
    public patientId: string,
    public psychologistId: string,
    public status: AppointmentStatus,
    public date: string,
    public reasonConsultation: string,
    public createdAt: DateTime,
  ) {
  }
}