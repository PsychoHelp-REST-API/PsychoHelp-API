import { Injectable } from '@nestjs/common';
import { CreateLogbookDto } from '../dto/request/create-logbook.dto';
import { UpdateLogbookDto } from '../dto/request/update-logbook.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { CommandBus } from '@nestjs/cqrs';
import { CreateLogbookValidator } from '../validators/create-logbook.validator';
import { CreateLogbookCommand } from '../commands/create-logbook.command';
import { CreateLogbookResponseDto } from '../dto/response/create-logbook-response.dto';

@Injectable()
export class LogbookService {
  constructor(
    private commandBus: CommandBus,
    private createLogbookValidator: CreateLogbookValidator,
  ) {}
  async create(
    createLogbookDto: CreateLogbookDto,
  ): Promise<Result<AppNotification, CreateLogbookDto>> {
    const notification: AppNotification = await this.createLogbookValidator.validate(
      createLogbookDto,
    );
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const createLogbookCommand: CreateLogbookCommand = new CreateLogbookCommand(
      createLogbookDto.patientId,
      createLogbookDto.consultationReason,
      createLogbookDto.description,
    );
    const logbookId = await this.commandBus.execute(createLogbookCommand);
    const createLogbookResponseDto: CreateLogbookResponseDto = new CreateLogbookResponseDto(
      logbookId,
      createLogbookDto.patientId,
      createLogbookDto.consultationReason,
      createLogbookDto.description
    );
    return Result.ok(createLogbookResponseDto);
  }

  findAll() {
    return `This action returns all logbook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} logbook`;
  }

  update(id: number, updateLogbookDto: UpdateLogbookDto) {
    return `This action updates a #${id} logbook`;
  }

  remove(id: number) {
    return `This action removes a #${id} logbook`;
  }
}
