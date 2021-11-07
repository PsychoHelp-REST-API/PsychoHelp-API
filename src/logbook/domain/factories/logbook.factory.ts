import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { Name } from '../../../common/domain/value-objects/name.value';
import { Logbook } from '../entities/logbook.entity';
import { Id } from '../../../common/domain/value-objects/id.value';

export class LogbookFactory {
  public static createFrom(name: Name){
    return new Logbook(Id.of(0), name, DateTime.utcNow());
  }
  public static withId(id: Id, name: Name, dateTime: DateTime) {
    return new Logbook(id, name, dateTime);
  }
}