import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PatientsApplicationService } from '../application/services/patients-application.service';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterPatientRequestDto } from '../application/dtos/request/register-patient-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { RegisterPatientResponseDto } from '../application/dtos/response/register-patient-response.dto';
import { ApiController } from '../../common/api/api.controller';
import { GetPatientsQuery } from '../application/queries/get-patients.query';
import { EditPsychologistRequestDto } from '../../psychologists/application/dtos/request/edit-psychologist-request.dto';

@ApiBearerAuth()
@ApiTags('Patient')
@Controller('patients')
export class PatientsController {
  constructor(
    private readonly patientsApplicationService: PatientsApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create patient' })
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
  @ApiOperation({ summary: 'All Patients' })
  async GetPatients(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const patients = await this.queryBus.execute(new GetPatientsQuery());
      return ApiController.ok(response, patients);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update patient' })
  updatePatient(
    @Param('id', ParseIntPipe) id: number,
    @Body() editPatientRequestDto: EditPsychologistRequestDto,
  ) {
    return this.patientsApplicationService.remove(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete patient' })
  remove(@Param('id') id: number) {
    return this.patientsApplicationService.remove(+id);
  }
}
