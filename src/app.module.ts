import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PsychologistsModule } from './psychologists/psychologists.module';
import { PatientModule } from './patient/patient.module';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [PsychologistsModule, PatientModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
