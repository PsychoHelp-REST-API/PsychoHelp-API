import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAppointmentQuery } from "../../queries/get-appointment.query";
import { getManager } from "typeorm";
import { GetAppointmentDto } from "../../dtos/queries/get-appointment.dto";

@QueryHandler(GetAppointmentQuery)
export class GetAppointmentsHandler implements IQueryHandler<GetAppointmentQuery>{
  constructor() {  }

  async execute(query: GetAppointmentQuery){
    const manager = getManager();
    const sql = `
    SELECT
    id,
    patient_id_from as patientId,
    psychologist_id_to as psychologistId,
    status,
    date,
    reason_consultation
    FROM
    appointments
    ORDER BY
    id;`;

    const ormAppointments = await manager.query(sql);
    if (ormAppointments.length <= 0){
      return [];
    }

    const apppointments: GetAppointmentDto[] = ormAppointments.map(function(
      ormAppointment
    ){
      const appointmentDto = new GetAppointmentDto();
      appointmentDto.id = Number(ormAppointment.id);
      appointmentDto.patientId = ormAppointment.patientId;
      appointmentDto.psychologistId = ormAppointment.psychologistId;
      appointmentDto.date = ormAppointment.date;
      appointmentDto.status = ormAppointment.status;
      appointmentDto.reasonConsultation = ormAppointment.reasonConsultation;
      return appointmentDto;
    });
    return apppointments;
  }
}