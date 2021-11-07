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
  ) {
  }

  public async validate(
    createLogbookDTO: CreateLogbookDto,
  ): Promise<AppNotification>{
    let notification: AppNotification = new AppNotification();
    const firstName: string = createLogbookDTO.firstName.trim();
    if (firstName.length <= 0) {
      notification.addError('Customer firstName is required', null);
    }
    const lastName: string = createLogbookDTO.lastName.trim();
    if (lastName.length <= 0) {
      notification.addError('Customer lastName is required', null);
    }
    return notification;
  }
}