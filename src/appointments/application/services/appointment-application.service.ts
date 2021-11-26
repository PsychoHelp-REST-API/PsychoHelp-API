import { Injectable, NotFoundException } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ScheduleAppointmentValidator } from "../validators/schedule-appointment.validator";
import { ScheduleRequestDto } from "../dtos/request/schedule-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";
import { ScheduleResponseDto } from "../dtos/response/schedule-response.dto";
import { ScheduleAppointmentCommand } from "../commands/schedule-appointment.command";
import { AppointmentStatus, AppointmentStatusLabel } from "../../domain/enums/appointment.status.enum";
import { DateTime } from "../../../common/domain/value-objects/date-time.value";
import { InjectRepository } from "@nestjs/typeorm";
import { AppointmentTypeORM } from "../../infrastructure/persistence/typeorm/entities/appointment.typeorm";
import { Repository } from "typeorm";
import { Appointment } from "../../domain/entities/appointment.entity";

@Injectable()
export class AppointmentApplicationService {
  constructor(
    private commandBus: CommandBus,
    private scheduleValidator: ScheduleAppointmentValidator,
    @InjectRepository(AppointmentTypeORM)
    private readonly appointmentRepository: Repository<Appointment>
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

  async remove(id: number){
    const appointment = await this.appointmentRepository.findOne(id);
    if(!appointment){
      throw new NotFoundException('Appointment doesnt exist');
    }
    return this.appointmentRepository.delete(id);
  }
}