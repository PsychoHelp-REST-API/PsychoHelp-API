import { Controller, Get, Post, Body, Res, Delete, Param, Put, ParseIntPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { RegisterPsychologistRequestDto } from '../application/dtos/request/register-psychologist-request.dto';
import { PsychologistsApplicationService } from '../application/services/psychologists-application.service';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { RegisterPsychologistResponseDto } from '../application/dtos/response/register-psychologist-response.dto';
import { ApiController } from '../../common/api/api.controller';
import { GetPsychologistsQuery } from '../application/queries/get-psychologists.query';
import { EditPsychologistRequestDto } from "../application/dtos/request/edit-psychologist-request.dto";

@ApiBearerAuth()
@ApiTags('Psychologist')
@Controller('psychologists')
export class PsychologistsController {
  constructor(
    private readonly psychologistsApplicationService: PsychologistsApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create psychologist' })
  async register(
    @Body() registerPsychologistRequestDto: RegisterPsychologistRequestDto,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterPsychologistResponseDto> =
        await this.psychologistsApplicationService.register(
          registerPsychologistRequestDto,
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
  @ApiOperation({ summary: 'All psychologists' })
  async GetPsychologists(
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const psychologists = await this.queryBus.execute(
        new GetPsychologistsQuery(),
      );
      return ApiController.ok(response, psychologists);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update psychologist'})
  updatePsychologist(@Param('id', ParseIntPipe) id: number, @Body() editPsychologistRequestDto: EditPsychologistRequestDto){
    return this.psychologistsApplicationService.update(+id, editPsychologistRequestDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete psychologist'})
  remove(@Param('id') id: number){
    return this.psychologistsApplicationService.remove(+id);
  }

}
