import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { ApiController } from '../../common/api/api.controller';
import { GetLogbookByPatientIdQuery } from '../application/queries/get-logbook-by-patient-id.query';

@ApiBearerAuth()
@ApiTags('Logbook for patient')
@Controller('patients/:id/logbook')
export class PatientLogbookController{
  constructor(
    private readonly queryBus: QueryBus
  ) {}

  @Get('')
  @ApiOperation({ summary: 'All logbooks for patient' })
  async getLogbookPatient(
    @Param('id', ParseIntPipe) id: number,
    @Res({passthrough:true}) response
  ):Promise<object> {
  try {
      const logbooks = await this.queryBus.execute(new GetLogbookByPatientIdQuery(id));
      return ApiController.ok(response, logbooks);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}