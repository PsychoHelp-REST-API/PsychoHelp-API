import { RegisterBillingCommand } from "../../commands/register-billing.command";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { BillingTypeORM } from "../../../infraestructure/persistence/typeorm/entities/billing.typeorm";
import { Repository } from "typeorm";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../common/application/app.notification";
import { BillingCode } from "../../../domain/value-objects/billing-code.value";

@CommandHandler(RegisterBillingCommand)
export class RegisterBillingHandler
  implements ICommandHandler<RegisterBillingCommand> {
  constructor(
    @InjectRepository(BillingTypeORM)
    private billingRepository: Repository<BillingTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: RegisterBillingCommand) {
    const codeResult: Result<AppNotification, BillingCode> = BillingCode.createCode(command.code);
    if (codeResult.isFailure()) return 0;

    // TODO: implementar nombre del paciente

    // TODO: implementar el factory

  }
}