import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogbookTypeORM } from '../../infrastructure/persistence/typeorm/entities/logbook.typeorm';
import { Repository } from 'typeorm';
import { CreateLogbookDto } from '../dto/request/create-logbook.dto';
import { AppNotification } from '../../../common/application/app.notification';

@Injectable()
export class CreateLogbookValidator{
  constructor(
    @InjectRepository(LogbookTypeORM)
    private logbookRepository: Repository<LogbookTypeORM>,
  ) {}

  public async validate(
    createLogbookDTO: CreateLogbookDto,
  ): Promise<AppNotification>{
    const notification: AppNotification = new AppNotification();
    console.log(createLogbookDTO.consultationReason);
    const consultationReason: string = createLogbookDTO.consultationReason.trim();
    if (consultationReason.length <= 0) {
      notification.addError('Logbook consultation reason is required', null);
    }
    const description: string = createLogbookDTO.description.trim();
    if (description.length <= 0) {
      notification.addError('Logbook description is required', null);
    }
    return notification;
  }
}