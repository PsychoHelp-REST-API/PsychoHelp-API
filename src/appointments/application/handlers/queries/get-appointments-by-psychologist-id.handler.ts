import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAppointmentsByPsychologistIdQuery } from "../../queries/get-appointments-by-psychologist-id.query";
import { getManager } from "typeorm";
import { GetAppointmentDto } from "../../dtos/queries/get-appointment.dto";

@QueryHandler(GetAppointmentsByPsychologistIdQuery)
export class GetAppointmentsByPsychologistIdHandler
  implements IQueryHandler<GetAppointmentsByPsychologistIdQuery>{
  constructor() {
  }

  async execute(query: GetAppointmentsByPsychologistIdQuery){
    const manager = getManager();
    const sql = `
    SELECT
    id,
    patient_id_from,
    psychologist_id_to,
    status,
    date,
    reason_consultation
    FROM
    appointments
    WHERE
    psychologist_id_to = ?; `;

    const ormAppointments = await manager.query(sql, [query.psychologistId]);
    if(ormAppointments.length <= 0){
      return {};
    }
    const appointments: GetAppointmentDto[]= ormAppointments.map(function(ormAppointments){
      let appointmentDto = new GetAppointmentDto();
      appointmentDto.id = Number(ormAppointments.id);
      appointmentDto.patientId = ormAppointments.patient_id_from;
      appointmentDto.psychologistId = ormAppointments.psychologist_id_to;
      appointmentDto.status = ormAppointments.status;
      appointmentDto.date = ormAppointments.date;
      appointmentDto.reasonConsultation = ormAppointments.reason_consultation;
      return appointmentDto;
    });
    return appointments;
  }
}