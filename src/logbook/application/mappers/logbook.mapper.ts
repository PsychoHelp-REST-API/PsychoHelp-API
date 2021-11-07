import { Logbook } from '../../domain/entities/logbook.entity';
import { LogbookTypeORM } from '../../infrastructure/persistence/typeorm/entities/logbook.typeorm';
import { LogbookIdTypeORM } from '../../infrastructure/persistence/typeorm/entities/logbook.id.typeorm';
import { NameTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';

export class LogbookMapper{
  public static toTypeORM(logbook: Logbook): LogbookTypeORM {
    const logbookTypeORM: LogbookTypeORM = new LogbookTypeORM();
    logbookTypeORM.id = LogbookIdTypeORM.from(logbook.getId().getValue());
    logbookTypeORM.name = NameTypeORM.from(logbook.getName().getFirstName(), logbook.getName().getLastName());
    return logbookTypeORM;
  }
}