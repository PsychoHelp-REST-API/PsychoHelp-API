import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ScheduleAppointment } from "../../../domain/events/schedule-appointment.event";

@EventsHandler(ScheduleAppointment)
export class AppointmentScheduledHandler implements IEventHandler<ScheduleAppointment>{
  constructor() {
  }

  async handle(event: ScheduleAppointment) {
    console.log('Appointment - handle ScheduleAppointment');
  }
}