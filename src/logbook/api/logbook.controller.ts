import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { LogbookService } from '../application/services/logbook.service';
import { CreateLogbookDto } from '../application/dto/request/create-logbook.dto';
import { UpdateLogbookDto } from '../application/dto/request/update-logbook.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { ApiController } from '../../common/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetLogbooksQuery } from '../application/queries/get-logbooks.query';

@Controller('logbook')
export class LogbookController {
  constructor(
    private readonly logbookService: LogbookService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async create(
    @Body() createLogbookDto: CreateLogbookDto,
    @Res({ passthrough: true }) response
  ): Promise<object>{
    try {
      const result: Result<AppNotification, CreateLogbookDto> =
        await this.logbookService.create(
          createLogbookDto
        );
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      console.log(error);
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getLogbooks(
    @Res({passthrough:true}) response
  ):Promise<object> {
    try {
      const logbooks = await this.queryBus.execute(new GetLogbooksQuery());
      return ApiController.ok(response, logbooks);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logbookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogbookDto: UpdateLogbookDto) {
    return this.logbookService.update(+id, updateLogbookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logbookService.remove(+id);
  }
}
