import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPsychologistsQuery } from "../../queries/get-psychologists.query";
import { getManager } from "typeorm";
import { GetPsychologistsDto } from "../../dtos/queries/get-psychologists.dto";

@QueryHandler(GetPsychologistsQuery)
export class GetPsychologistsHandler implements IQueryHandler<GetPsychologistsQuery>{
  constructor() {}

  async execute(query: GetPsychologistsQuery){
    const manager = getManager();
    const sql = `
    SELECT
    id,
    first_name as firstName,
    last_name as lastName,
    dni,
    email,
    password,
    description
    FROM
    psychologists
    ORDER BY
    last_name, first_name;`;

    const ormPsychologists = await manager.query(sql);
    if(ormPsychologists.length <= 0) {
      return [];
    }

    const psychologists: GetPsychologistsDto[] = ormPsychologists.map(function(ormPsychologist){
      let psychologistDto = new GetPsychologistsDto();
      psychologistDto.id = Number(ormPsychologist.id);
      psychologistDto.firstName = ormPsychologist.firstName;
      psychologistDto.lastName = ormPsychologist.lastName;
      psychologistDto.dni = ormPsychologist.dni;
      psychologistDto.email = ormPsychologist.email;
      psychologistDto.password = ormPsychologist.password;
      psychologistDto.description = ormPsychologist.description;
      return psychologistDto;
    });
    return psychologists;
  }
}