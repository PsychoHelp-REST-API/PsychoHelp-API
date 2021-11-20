import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetLogbookByIdQuery } from '../../queries/get-logbook-by-id.query';
import { getManager } from 'typeorm';
import { GetLogbooksDto } from '../../dto/queries/get-logbooks.dto';
import { GetLogbookByPatientIdQuery } from '../../queries/get-logbook-by-patient-id.query';

@QueryHandler(GetLogbookByPatientIdQuery)
export class GetLogbookByPatientIdHandler implements IQueryHandler<GetLogbookByPatientIdQuery>{
  constructor() {
  }
  async execute(query: GetLogbookByPatientIdQuery ){
    const manager = getManager();
    const sql = `
    SELECT
        l.id,
        l.consultation_reason,
        l.description,
        l.patient_id
    FROM
        logbooks l
    WHERE
    l.patient_id = ?;`;
    const ormLogbooks = await manager.query(sql, [query.psychologistId]);
    if (ormLogbooks.length <= 0){
      return {};
    }
    const logbooks: GetLogbooksDto[] = ormLogbooks.map(function (ormLogbooks) {
      let logbookDto = new GetLogbooksDto();
      logbookDto.id = Number(ormLogbooks.id);
      logbookDto.consultationReason = ormLogbooks.consultation_reason;
      logbookDto.description = ormLogbooks.description;
      logbookDto.patientId = Number(ormLogbooks.patient_id);
      return logbookDto;
    });
    return logbooks;
  }
}