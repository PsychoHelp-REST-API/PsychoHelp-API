import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PsychologistsModule } from './psychologists/psychologists.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PatientsModule } from "./patients/patients.module";
import { PaymentModule } from './payment/payment.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [PsychologistsModule, TypeOrmModule.forRoot(), PatientsModule, PaymentModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
