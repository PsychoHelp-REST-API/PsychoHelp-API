import { Module } from '@nestjs/common';
import { LogbookService } from './application/services/logbook.service';
import { LogbookController } from './api/logbook.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogbookTypeORM } from './infrastructure/persistence/typeorm/entities/logbook.typeorm';
import { CreateLogbookHandler } from './application/handlers/commands/create-logbook.handler';
import { LogbookCreatedHandler } from './application/handlers/events/logbook-created.handler';
import { GetLogbooksHandler } from './application/handlers/queries/get-logbooks.handler';
import { CreateLogbookValidator } from './application/validators/create-logbook.validator';
import { PatientLogbookController } from './api/patient-logbook.controller';
import { GetLogbookByPatientIdHandler } from './application/handlers/queries/get-logbook-by-patient-id.handler';
import { GetLogbookByIdHandler } from './application/handlers/queries/get-logbook-by-id.handler';
import { PatientTypeORM } from "../patients/infrastructure/persistence/typeorm/entities/patient.typeorm";

export const CommandHandlers = [CreateLogbookHandler];
export const EventHandlers = [LogbookCreatedHandler];
export const QueryHandlers = [GetLogbooksHandler, GetLogbookByPatientIdHandler, GetLogbookByIdHandler]

@Module({
  imports:[
    CqrsModule,
    TypeOrmModule.forFeature([LogbookTypeORM, PatientTypeORM]),
  ],
  controllers: [LogbookController, PatientLogbookController],
  providers: [
    LogbookService,
    CreateLogbookValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class LogbookModule {}
