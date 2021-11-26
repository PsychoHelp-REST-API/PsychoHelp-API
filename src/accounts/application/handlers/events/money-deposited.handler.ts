import { CommandBus, IEventHandler } from "@nestjs/cqrs";
import { MoneyDeposited } from "../../../../payments/domain/events/money-deposited.event";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountTypeORM } from "../../../infrastructure/persistence/typeorm/entities/account.typeorm";
import { getManager, Repository } from "typeorm";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../common/application/app.notification";
import { AccountNumber } from "../../../domain/value-objects/account-number.value";
import { Money } from "../../../../common/domain/value-objects/money.value";
import { Account } from "../../../domain/entities/account.entity";
import { AccountFactory } from "../../../domain/factories/account.factory";
import { AccountId } from "../../../domain/value-objects/account-id.value";
import { PsychologistId } from "../../../../psychologists/domain/value-objects/psychologist-id.value";
import { Currency } from "../../../../common/domain/enums/currency.enum";
import { AccountMapper } from "../../mappers/account.mapper";
import { CompletePayment } from "../../../../payments/application/commands/complete-payment.command";
import { EventsHandler } from "@nestjs/cqrs/dist/utils/events-handler.decorator";

@EventsHandler(MoneyDeposited)
export class MoneyDepositedHandler
  implements  IEventHandler<MoneyDeposited>{
  constructor(
    @InjectRepository(AccountTypeORM)
    private accountRepository: Repository<AccountTypeORM>,
    private commandBus: CommandBus
  ) {
  }

  async handle(event: MoneyDeposited){
    console.log('Accounts BC - handle MoneyDeposited');
    let accountTypeORM: AccountTypeORM = await this.accountRepository
      .createQueryBuilder()
      .where("id = :id")
      .setParameter("id", Number(event.accountIdTo))
      .getOne();

    if(accountTypeORM == null){
      console.log('MoneyDeposited accountTypeORM not found');
      return;
    }

    const accountNumberResult: Result<AppNotification, AccountNumber> = AccountNumber.create(accountTypeORM.number.value);
    if(accountNumberResult.isFailure()){
      return;
    }

    const accountAmount: Money = Money.create(accountTypeORM.balance.balance, accountTypeORM.balance.currency);
    let account: Account = AccountFactory.withId(AccountId.of(accountTypeORM.id), accountNumberResult.value, accountAmount, PsychologistId.create(accountTypeORM.psychologistId.value));
    const depositAmount: Money = Money.create(event.amount, Currency.SOLES);
    const depositResult: Result<AppNotification, Account> = account.deposit(depositAmount);
    if(depositResult.isFailure()){
      console.log('MoneyDeposited error');
      return;
    }

    accountTypeORM = AccountMapper.toTypeORM(account);
    await getManager().transaction(async (paymentEntityManager) => {
      //await paymentEntityManager.save(accountTypeORM);
      //accountTypeORM = await this.accountRepository.save(accountTypeORM);
      const updateResult = await this.accountRepository.update(accountTypeORM.id,accountTypeORM)
      if (updateResult == null) {
        console.log('MoneyDeposited error');
        return;
      }
      if(accountTypeORM == null){
        console.log('MoneyDeposited error');
        return;
      }
      const completePayment: CompletePayment = new CompletePayment(event.paymentId);
      await this.commandBus.execute(completePayment);
    });
  }
}