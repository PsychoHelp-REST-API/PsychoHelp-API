import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetLogbooksQuery } from '../../queries/get-logbooks.query';
import { getManager } from 'typeorm';
import { GetLogbooksDto } from '../../dto/queries/get-logbooks.dto';

@QueryHandler(GetLogbooksQuery)
export class GetLogbooksHandler implements IQueryHandler<GetLogbooksQuery> {
  constructor() {}

  async execute() {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      patient_id as patient_id,
      consultation_reason as consultation_reason,
      description
    FROM 
      logbooks
    ORDER BY
      id;`;
    const ormLogbooks = await manager.query(sql);
    if (ormLogbooks.length <= 0) {
      return [];
    }
    const logbooks: GetLogbooksDto[] = ormLogbooks.map(function (ormLogbook) {
      let logbookDto = new GetLogbooksDto();
      logbookDto.id = Number(ormLogbook.id);
      logbookDto.consultationReason = ormLogbook.consultation_reason;
      logbookDto.patientId = Number(ormLogbook.patient_id);
      logbookDto.description = ormLogbook.description;
      return logbookDto;
    });
    return logbooks;
  }
}