import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PsychologistsModule } from "./psychologists/psychologists.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatientsModule } from "./patients/patients.module";
import { AppointmentsModule } from './appointments/appointments.module';

@Module({
  imports: [ PsychologistsModule, PatientsModule, AppointmentsModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
