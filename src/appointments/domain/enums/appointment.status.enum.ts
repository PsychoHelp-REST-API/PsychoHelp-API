export enum AppointmentStatus {
  PENDING = 1,
  COMPLETED = 2,
  CANCELED = 3
}

export const AppointmentStatusLabel = new Map<number, string>([
  [AppointmentStatus.PENDING, 'PENDING'],
  [AppointmentStatus.COMPLETED, 'COMPLETED'],
  [AppointmentStatus.CANCELED, 'CANCELED']
]);