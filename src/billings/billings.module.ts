import { Module } from '@nestjs/common';
import { BillingsService } from './application/services/billings.service';
import { BillingsController } from './api/billings.controller';
import { IssueBillingHandler } from "./application/handlers/commands/issue-billing.handler";
import { BillingIssuedHandler } from "./application/handlers/events/billing-issued.handler";
import { GetBillingsHandler } from "./application/handlers/queries/get-billings.handler";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BillingTypeORM } from "./infrastructure/persistence/typeorm/entities/billing.typeorm";
import { IssueBillingValidator } from "./application/validators/issue-billing.validator";
import { GetBillingByIdHandler } from "./application/handlers/queries/get-billing-by-id.handler";

export const CommandHandlers = [IssueBillingHandler];
export const EventHandlers = [BillingIssuedHandler];
export const QueryHandlers = [GetBillingsHandler, GetBillingByIdHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([BillingTypeORM])],
  controllers: [BillingsController],
  providers: [
    BillingsService,
    IssueBillingValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class BillingsModule {}
