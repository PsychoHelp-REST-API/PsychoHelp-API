import { AppointmentStatus } from "../../domain/enums/appointment.status.enum";
import { DateTime } from "../../../common/domain/value-objects/date-time.value";

export class CancelAppointmentCommand{
  constructor(
    public readonly patientId: string,
    public readonly psychologistId: string,
    public readonly status: AppointmentStatus,
    public readonly date: string,
    public readonly reasonConsultation: string,
    public readonly createdAt: string
  ) {
  }
}