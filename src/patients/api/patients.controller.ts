import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { PatientsApplicationService } from '../application/services/patients-application.service';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterPatientRequestDto } from '../application/dtos/request/register-patient-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { RegisterPatientResponseDto } from '../application/dtos/response/register-patient-response.dto';
import { ApiController } from '../../common/api/api.controller';
import { GetPatientsQuery } from '../application/queries/get-patients.query';

@Controller('patients')
export class PatientsController {
  constructor(
    private readonly patientsApplicationService: PatientsApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async register(
    @Body() registerPatientRequestDto: RegisterPatientRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterPatientResponseDto> =
        await this.patientsApplicationService.register(
          registerPatientRequestDto,
        );
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async GetPatients(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const patients = await this.queryBus.execute(new GetPatientsQuery());
      return ApiController.ok(response, patients);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
