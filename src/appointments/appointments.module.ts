import { Module } from '@nestjs/common';
import { AppointmentsService } from './application/services/appointments.service';
import { AppointmentsController } from './api/appointments.controller';
import { AppointmentApplicationService } from "./application/services/appointment-application.service";
import { ScheduleAppointmentHandler } from "./application/handlers/commands/schedule-appointment.handler";
import { AppointmentScheduledHandler } from "./application/handlers/events/appointment-scheduled.handler";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppointmentTypeORM } from "./infrastructure/persistence/typeorm/entities/appointment.typeorm";
import { PatientTypeORM } from "../patients/infrastructure/persistence/typeorm/entities/patient.typeorm";
import { PsychologistTypeORM } from "../psychologists/infrastructure/persistence/typeorm/entities/psychologist.typeorm";
import { ScheduleAppointmentValidator } from "./application/validators/schedule-appointment.validator";
import { GetAppointmentsHandler } from "./application/handlers/queries/get-appointments.handler";

export const CommandHandlers = [ScheduleAppointmentHandler];
export const EventHandlers = [AppointmentScheduledHandler];
export const QueryHandlers = [GetAppointmentsHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([AppointmentTypeORM, PatientTypeORM, PsychologistTypeORM])
  ],
  controllers: [AppointmentsController],
  providers: [
    AppointmentApplicationService,
    ScheduleAppointmentValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class AppointmentsModule {}
