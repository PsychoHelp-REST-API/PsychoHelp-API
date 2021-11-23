import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ScheduleAppointmentValidator } from "../validators/schedule-appointment.validator";
import { ScheduleRequestDto } from "../dtos/request/schedule-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";
import { ScheduleResponseDto } from "../dtos/response/schedule-response.dto";
import { ScheduleAppointmentCommand } from "../commands/schedule-appointment.command";
import { AppointmentStatus, AppointmentStatusLabel } from "../../domain/enums/appointment.status.enum";
import { DateTime } from "../../../common/domain/value-objects/date-time.value";

@Injectable()
export class AppointmentApplicationService {
  constructor(
    private commandBus: CommandBus,
    private scheduleValidator: ScheduleAppointmentValidator
  ) {}

  async schedule(scheduleRequestDto: ScheduleRequestDto): Promise<Result<AppNotification, ScheduleResponseDto>> {
    const notification: AppNotification = await this.scheduleValidator.validate(scheduleRequestDto);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const scheduleAppointment: ScheduleAppointmentCommand = new ScheduleAppointmentCommand(
      scheduleRequestDto.patientId,
      scheduleRequestDto.psychologistId,
      AppointmentStatus.PENDING,
      scheduleRequestDto.date,
      scheduleRequestDto.reasonConsultation,
      DateTime.utcNow()
    );

    const appointmentId: number = await this.commandBus.execute(scheduleAppointment);
    const scheduleResponseDto: ScheduleResponseDto = new ScheduleResponseDto(
      appointmentId,
      scheduleRequestDto.patientId,
      scheduleRequestDto.psychologistId,
      AppointmentStatusLabel.get(AppointmentStatus.PENDING),
      scheduleRequestDto.date,
      scheduleRequestDto.reasonConsultation,
      null
    );
    return Result.ok(scheduleResponseDto);
  }
}