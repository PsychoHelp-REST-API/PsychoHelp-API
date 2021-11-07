import { Column, Entity, Unique } from 'typeorm';
import { NameTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { LogbookIdTypeORM } from './logbook.id.typeorm';


@Entity('logbooks')
@Unique('UQ_logbook_id', ['id.value'])
export class LogbookTypeORM{
  @Column((type) => LogbookIdTypeORM, { prefix: false })
  public id: LogbookIdTypeORM;

  @Column((type) => NameTypeORM, { prefix: false })
  public name: NameTypeORM;


}