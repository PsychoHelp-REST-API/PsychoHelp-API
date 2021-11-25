import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppointmentApplicationService } from '../application/services/appointment-application.service';
import { QueryBus } from '@nestjs/cqrs';
import { ScheduleRequestDto } from '../application/dtos/request/schedule-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { GetAppointmentQuery } from '../application/queries/get-appointment.query';

@ApiBearerAuth()
@ApiTags('Appointment')
@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentsApplicationService: AppointmentApplicationService,
    private readonly queryBys: QueryBus,
  ) {}

  @Post('/schedule')
  @ApiOperation({ summary: 'Create appointment' })
  async schedule(
    @Body() scheduleRequestDto: ScheduleRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, ScheduleRequestDto> =
        await this.appointmentsApplicationService.schedule(scheduleRequestDto);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  @ApiOperation({ summary: 'All appointments' })
  async getAppointments(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const appointments = await this.queryBys.execute(
        new GetAppointmentQuery(),
      );
      return ApiController.ok(response, appointments);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
