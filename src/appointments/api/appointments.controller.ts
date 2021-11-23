import { Body, Controller, Post, Res } from "@nestjs/common";
import { AppointmentsService } from '../application/services/appointments.service';
import { AppointmentApplicationService } from "../application/services/appointment-application.service";
import { QueryBus } from "@nestjs/cqrs";
import { ScheduleRequestDto } from "../application/dtos/request/schedule-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../common/application/app.notification";
import { ApiController } from "../../common/api/api.controller";

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsApplicationService: AppointmentApplicationService,
              private readonly queryBys: QueryBus
  ) {}

  @Post('/schedule')
  async schedule(
    @Body() scheduleRequestDto: ScheduleRequestDto,
    @Res({passthrough: true}) response
  ): Promise<object> {
    try{
      const result: Result<AppNotification, ScheduleRequestDto> = await this.appointmentsApplicationService.schedule(scheduleRequestDto);
      if(result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error){
      return ApiController.serverError(response, error);
    }
  }
}
