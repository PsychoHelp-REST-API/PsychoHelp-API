import { Module } from '@nestjs/common';
import { PsychologistsApplicationService } from './application/services/psychologists-application.service';
import { PsychologistsController } from './api/psychologists.controller';
import { RegisterPsychologistValidator } from './application/validators/register-psychologist.validator';
import { RegisterPsychologistHandler } from './application/handlers/commands/register-psychologist.handler';
import { PsychologistRegisteredHandler } from './application/handlers/events/psychologist-registered.handler';
import { GetPsychologistsHandler } from './application/handlers/queries/get-psychologists.handler';
import { CqrsModule } from "@nestjs/cqrs";
import { PsychologistTypeORM } from "./infrastructure/persistence/typeorm/entities/psychologist.typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";

export const CommandHandlers = [RegisterPsychologistHandler];
export const EventHandlers = [PsychologistRegisteredHandler];
export const QueryHandlers = [GetPsychologistsHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([PsychologistTypeORM]),
  ],
  controllers: [PsychologistsController],
  providers: [
    PsychologistsApplicationService,
    RegisterPsychologistValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class PsychologistsModule {}
