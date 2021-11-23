import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PsychologistsModule } from './psychologists/psychologists.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatientsModule } from "./patients/patients.module";
import { BillingsModule } from "./billings/billings.module";

@Module({
  imports: [PsychologistsModule, TypeOrmModule.forRoot(), PatientsModule, BillingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
