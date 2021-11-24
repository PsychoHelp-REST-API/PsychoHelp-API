import { Module } from '@nestjs/common';
import { OpenAccountHandler } from './application/handlers/commands/open-payment.handler';
import { PaymentOpenedHandler } from './application/handlers/events/payment-opened.handler';
import { MoneyDepositedHandler } from './application/handlers/events/money-deposited.handler';
import { MoneyWithdrawnHandler } from './application/handlers/events/money-withdrawn.handler';
import { MoneyTransferredHandler } from './application/handlers/events/money-transferred.handler';
import { GetPaymentsHandler } from './application/handlers/queries/get-payments.handler';
import { GetPaymentByIdHandler } from './application/handlers/queries/get-payment-by-id.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentTypeORM } from './infrastructure/persistence/typeorm/entities/payment.typeorm';
import { OpenPaymentValidator } from './application/validators/open-payment.validator';
import { PaymentsApplicationService } from './application/services/payments-application.service';
import { PaymentController } from './api/payment.controller';

export const CommandHandlers = [OpenAccountHandler];
export const EventHandlers = [
  PaymentOpenedHandler,
  MoneyDepositedHandler,
  MoneyWithdrawnHandler,
  MoneyTransferredHandler,
];
export const QueryHandlers = [GetPaymentsHandler, GetPaymentByIdHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PaymentTypeORM])],
  controllers: [PaymentController],
  providers: [
    PaymentsApplicationService,
    OpenPaymentValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class PaymentModule {}
