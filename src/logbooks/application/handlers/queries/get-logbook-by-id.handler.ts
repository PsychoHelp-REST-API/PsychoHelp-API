import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetLogbookByIdQuery } from '../../queries/get-logbook-by-id.query';
import { getManager } from 'typeorm';
import { GetLogbooksDto } from '../../dto/queries/get-logbooks.dto';
import { LogbookTypeORM } from '../../../infrastructure/persistence/typeorm/entities/logbook.typeorm';

@QueryHandler(GetLogbookByIdQuery)
export class GetLogbookByIdHandler implements IQueryHandler<GetLogbookByIdQuery>{
  constructor() {
  }
  async execute(query: GetLogbookByIdQuery ){
    const manager = getManager();
    const sql = `
    SELECT
        id,
        consultation_reason,
        description,
        patient_id
    FROM
        logbooks
    WHERE
    id = ?;`;
    const ormLogbooks = await manager.query(sql, [query.logbookId]);

    console.log(query.logbookId);
    if (ormLogbooks.length <= 0){
      return {};
    }
    const ormLogbook = ormLogbooks[0];

    let logbookDto = new GetLogbooksDto();
    logbookDto.id = Number(ormLogbook.id);
    logbookDto.consultationReason = ormLogbook.consultation_reason;
    logbookDto.description = ormLogbook.description;
    logbookDto.patientId = Number(ormLogbook.patient_id);
    return logbookDto;
  }
}