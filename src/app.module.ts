import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PsychologistsModule } from "./psychologists/psychologists.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatientsModule } from "./patients/patients.module";
import { AppointmentsModule } from './appointments/appointments.module';
import { BillingsModule } from "./billings/billings.module";
import { LogbookModule } from './logbooks/logbook.module';
import { AccountsModule } from './accounts/accounts.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [ PsychologistsModule, PatientsModule, AppointmentsModule, BillingsModule, LogbookModule, AccountsModule, PaymentsModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
