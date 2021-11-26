import { Module } from '@nestjs/common';
import { AccountsService } from './application/services/accounts.service';
import { AccountsController } from './api/accounts.controller';
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AccountTypeORM } from "./infrastructure/persistence/typeorm/entities/account.typeorm";
import { OpenAccountValidator } from "./application/validators/open-account.validator";
import { OpenAccountHandler } from "./application/handlers/commands/open-account.handler";
import { AccountOpenedHandler } from "./application/handlers/events/account-opened.handler";
import { GetAccountsHandler } from "./application/handlers/queries/get-accounts.handler";
import { MoneyDepositedHandler } from "./application/handlers/events/money-deposited.handler";

export const CommandHandlers = [OpenAccountHandler];
export const EventHandlers = [AccountOpenedHandler, MoneyDepositedHandler];
export const QueryHandlers = [GetAccountsHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([AccountTypeORM])
  ],
  controllers: [AccountsController],
  providers: [
    AccountsService,
    OpenAccountValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class AccountsModule {}
