import { Module } from '@nestjs/common';
import { PatientsController } from './api/patients.controller';
import { RegisterPatientHandler } from './application/handlers/commands/register-patient.handler';
import { PatientRegisteredHandler } from './application/handlers/events/patient-registered.handler';
import { GetPatientsHandler } from './application/handlers/queries/get-patients.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientTypeORM } from './infrastructure/persistence/typeorm/entities/patient.typeorm';
import { PatientsApplicationService } from './application/services/patients-application.service';
import { RegisterPatientValidator } from './application/validators/register-patient.validator';

export const CommandHandlers = [RegisterPatientHandler];
export const EventHandlers = [PatientRegisteredHandler];
export const QueryHandlers = [GetPatientsHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PatientTypeORM])],
  controllers: [PatientsController],
  providers: [
    PatientsApplicationService,
    RegisterPatientValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class PatientsModule {}
