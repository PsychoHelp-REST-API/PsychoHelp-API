import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { OpenAccount } from "../../commands/open-account.command";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountTypeORM } from "../../../infrastructure/persistence/typeorm/entities/account.typeorm";
import { Repository } from "typeorm";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../common/application/app.notification";
import { AccountNumber } from "../../../domain/value-objects/account-number.value";
import { Money } from "../../../../common/domain/value-objects/money.value";
import { Currency } from "../../../../common/domain/enums/currency.enum";
import { PsychologistId } from "../../../../psychologists/domain/value-objects/psychologist-id.value";
import { Account } from "../../../domain/entities/account.entity";
import { AccountFactory } from "../../../domain/factories/account.factory";
import { AccountMapper } from "../../mappers/account.mapper";
import { AccountId } from "../../../domain/value-objects/account-id.value";

@CommandHandler(OpenAccount)
export class OpenAccountHandler
  implements ICommandHandler<OpenAccount>{
  constructor(
    @InjectRepository(AccountTypeORM)
    private accountRepository: Repository<AccountTypeORM>,
    private publisher: EventPublisher
  ) {
  }

  async execute(command: OpenAccount){
    let accountId: number = 0;
    const accountNumberResult: Result<AppNotification, AccountNumber> = AccountNumber.create(command.number);
    if (accountNumberResult.isFailure()){
      return accountId;
    }

    const balance: Money = Money.create(0, Currency.SOLES);
    const psychologistId: PsychologistId = PsychologistId.create(command.psychologistId);
    let account: Account = AccountFactory.createFrom(accountNumberResult.value, balance, psychologistId);
    let accountTypeORM: AccountTypeORM = AccountMapper.toTypeORM(account);
    accountTypeORM = await this.accountRepository.save(accountTypeORM);
    if(accountTypeORM == null) {
      return accountId;
    }

    accountId = Number(accountTypeORM.id);
    account.changeId(AccountId.of(accountId));
    account = this.publisher.mergeObjectContext(account);
    account.open();
    account.commit();
    return accountId;
  }
}