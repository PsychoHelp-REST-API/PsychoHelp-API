import { IQueryHandler } from '@nestjs/cqrs';
import { GetLogbooksQuery } from '../../queries/get-logbooks.query';
import { getManager } from 'typeorm';
import { GetLogbooksDto } from '../../dto/queries/get-logbooks.dto';

export class GetLogbooksHandler implements IQueryHandler<GetLogbooksQuery> {
  constructor() {}

  async execute(query: GetLogbooksQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      first_name as firstName,
      last_name as lastName,
      dni
    FROM 
      customers
    ORDER BY
      last_name, first_name;`;
    const ormLogbooks = await manager.query(sql);
    if (ormLogbooks.length <= 0) {
      return [];
    }
    const logbooks: GetLogbooksDto[] = ormLogbooks.map(function (ormCustomer) {
      let logbookDto = new GetLogbooksDto();
      logbookDto.id = Number(ormCustomer.id);
      logbookDto.firstName = ormCustomer.firstName;
      logbookDto.lastName = ormCustomer.lastName;
      return logbookDto;
    });
    return logbooks;
  }
}