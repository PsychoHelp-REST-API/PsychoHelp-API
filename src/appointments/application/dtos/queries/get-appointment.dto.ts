export class GetAppointmentDto {
  public id: number;
  public patientId: string;
  public psychologistId: string;
  public status: string;
  public date: string;
  public reasonConsultation: string;
}