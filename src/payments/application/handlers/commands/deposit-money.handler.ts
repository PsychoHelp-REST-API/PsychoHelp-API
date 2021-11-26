import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { DepositMoney } from "../../commands/deposit-money.command";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountTypeORM } from "../../../../accounts/infrastructure/persistence/typeorm/entities/account.typeorm";
import { Repository } from "typeorm";
import { PaymentTypeORM } from "../../../infrastructure/persistence/typeorm/entities/payment.typeorm";
import { AccountId } from "../../../../accounts/domain/value-objects/account-id.value";
import { Money } from "../../../../common/domain/value-objects/money.value";
import { Currency } from "../../../../common/domain/enums/currency.enum";
import { Payment } from "../../../domain/entities/payment.entity";
import { PaymentFactory } from "../../../domain/factories/payment.factory";
import { PaymentStatus } from "../../../domain/enums/payment-status.enum";
import { PaymentMapper } from "../../mappers/payment.mapper";
import { PaymentId } from "../../../domain/value-objects/payment-id.value";

@CommandHandler(DepositMoney)
export class DepositMoneyHandler
  implements ICommandHandler<DepositMoney>{
  constructor(
    @InjectRepository(AccountTypeORM)
    private accountRepository: Repository<AccountTypeORM>,
    @InjectRepository(PaymentTypeORM)
    private paymentRepository: Repository<PaymentTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: DepositMoney){

    let paymentId: number = 0;
    const accountNumber: string = command.accountNumber.trim();
    const accountTypeORM: AccountTypeORM = await this.accountRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .useTransaction(true)
      .where("number = :number")
      .setParameter("number", accountNumber)
      .getOne();

    if(accountTypeORM == null){
      return paymentId;
    }

    const accountToId: AccountId = AccountId.of(accountTypeORM.id);
    const amount: Money = Money.create(command.amount, Currency.SOLES);
    let payment: Payment = PaymentFactory.createFrom(PaymentStatus.STARTED, accountToId, amount);
    let paymentTypeORM: PaymentTypeORM = PaymentMapper.toTypeORM(payment);
    paymentTypeORM = await this.paymentRepository.save(paymentTypeORM);
    if(paymentTypeORM == null){
      return paymentId;
    }

    paymentId = Number(paymentTypeORM.id);
    payment.changeId(PaymentId.of(paymentId));
    payment = this.publisher.mergeObjectContext(payment);
    payment.deposit();
    payment.commit();
    return paymentId;
  }
}