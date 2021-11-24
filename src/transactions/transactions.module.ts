import { Module } from '@nestjs/common';
import { DepositMoneyHandler } from './application/handlers/commands/deposit-money.handler';
import { WithdrawMoneyHandler } from './application/handlers/commands/withdraw-money.handler';
import { TransferMoneyHandler } from './application/handlers/commands/transfer-money.handler';
import { CompleteTransactionHandler } from './application/handlers/commands/complete-transaction.handler';
import { MoneyTransferredHandler } from './application/handlers/events/money-transferred.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionTypeORM } from './infrastructure/persistence/typeorm/entities/transaction.typeorm';
import { PaymentTypeORM } from '../payment/infrastructure/persistence/typeorm/entities/payment.typeorm';
import { DepositMoneyValidator } from './application/validators/deposit-money.validator';
import { WithdrawMoneyValidator } from './application/validators/withdraw-money.validator';
import { TransferMoneyValidator } from './application/validators/transfer-money.validator';
import { TransactionsApplicationService } from "./application/services/transactions-application.service";
import { TransactionsController } from "./api/transactions.controller";

export const CommandHandlers = [
  DepositMoneyHandler,
  WithdrawMoneyHandler,
  TransferMoneyHandler,
  CompleteTransactionHandler,
];
export const EventHandlers = [MoneyTransferredHandler];
export const QueryHandlers = [];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([TransactionTypeORM, PaymentTypeORM]),
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionsApplicationService,
    DepositMoneyValidator,
    WithdrawMoneyValidator,
    TransferMoneyValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class TransactionsModule {}
