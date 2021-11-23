import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PsychologistsModule } from "./psychologists/psychologists.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatientsModule } from "./patients/patients.module";
import { AppointmentsModule } from './appointments/appointments.module';
import { BillingsModule } from "./billings/billings.module";
import { LogbookModule } from './logbooks/logbook.module';

@Module({
  imports: [ PsychologistsModule, PatientsModule, AppointmentsModule, BillingsModule, LogbookModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
