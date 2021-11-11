import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPatientsQuery } from '../../queries/get-patients.query';
import { getManager } from 'typeorm';
import { GetPatientsDto } from '../../dtos/queries/get-patients.dto';

@QueryHandler(GetPatientsQuery)
export class GetPatientsHandler implements IQueryHandler<GetPatientsQuery> {
  constructor() {}

  async execute(query: GetPatientsQuery) {
    const manager = getManager();
    const sql = `
    SELECT
    id,
    first_name as firstName,
    last_name as lastName,
    dni,
    email,
    password
    FROM
    patients
    ORDER BY
    last_name, first_name;`;

    const ormPatients = await manager.query(sql);
    if (ormPatients.length <= 0) {
      return [];
    }

    const patients: GetPatientsDto[] = ormPatients.map(function (ormPatient) {
      const patientDto = new GetPatientsDto();
      patientDto.id = Number(ormPatient.id);
      patientDto.firstName = ormPatient.firstName;
      patientDto.lastName = ormPatient.lastName;
      patientDto.dni = ormPatient.dni;
      patientDto.email = ormPatient.email;
      patientDto.password = ormPatient.password;
      return patientDto;
    });
    return patients;
  }
}
