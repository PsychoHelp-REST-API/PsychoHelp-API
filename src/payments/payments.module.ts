import { Module } from '@nestjs/common';
import { PaymentsService } from './application/services/payments.service';
import { PaymentsController } from './api/payments.controller';
import { DepositMoneyHandler } from "./application/handlers/commands/deposit-money.handler";
import { MoneyDepositedHandler } from "./application/handlers/events/money-deposited.handler";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentTypeORM } from "./infrastructure/persistence/typeorm/entities/payment.typeorm";
import { AccountTypeORM } from "../accounts/infrastructure/persistence/typeorm/entities/account.typeorm";
import { DepositMoneyValidator } from "./application/validators/deposit-money.validator";

export const CommandHandlers = [DepositMoneyHandler];
export const EventHandlers = [MoneyDepositedHandler];
export const QueryHandlers = [];


@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([PaymentTypeORM, AccountTypeORM]),
  ],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    DepositMoneyValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class PaymentsModule {}
