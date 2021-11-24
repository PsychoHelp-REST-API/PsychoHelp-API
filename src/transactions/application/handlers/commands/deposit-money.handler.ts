import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { DepositMoney } from '../../commands/deposit-money.command';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTypeORM } from '../../../../payment/infrastructure/persistence/typeorm/entities/payment.typeorm';
import { Repository } from 'typeorm';
import { TransactionTypeORM } from '../../../infrastructure/persistence/typeorm/entities/transaction.typeorm';
import { PaymentId } from '../../../../payment/domain/value-objects/payment-id.value';
import { Money } from '../../../../common/domain/value-objects/money.value';
import { Currency } from '../../../../common/domain/enums/currency.enum';
import { Transaction } from '../../../domain/entities/transaction.entity';
import { TransactionFactory } from '../../../domain/factories/transaction.factory';
import { TransactionType } from '../../../domain/enums/transaction-type.enum';
import { TransactionStatus } from '../../../domain/enums/transaction.status.enum';
import { TransactionMapper } from '../../mappers/transaction.mapper';
import { TransactionId } from '../../../domain/value-objects/transaction-id.value';

@CommandHandler(DepositMoney)
export class DepositMoneyHandler implements ICommandHandler<DepositMoney> {
  constructor(
    @InjectRepository(PaymentTypeORM)
    private paymentRepository: Repository<PaymentTypeORM>,
    @InjectRepository(TransactionTypeORM)
    private transactionRepository: Repository<TransactionTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: DepositMoney) {
    let transactionId = 0;
    const paymentNumber: string = command.paymentNumber.trim();
    const paymentTypeORM: PaymentTypeORM = await this.paymentRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .useTransaction(true)
      .where('number = :number')
      .setParameter('number', paymentNumber)
      .getOne();
    if (paymentTypeORM == null) {
      return transactionId;
    }
    const paymentFromId: PaymentId = PaymentId.of(paymentTypeORM.id);
    const amount: Money = Money.create(command.amount, Currency.SOLES);
    let transaction: Transaction = TransactionFactory.createFrom(
      TransactionType.DEPOSIT,
      TransactionStatus.STARTED,
      paymentFromId,
      null,
      amount,
      null,
    );
    let transactionTypeORM: TransactionTypeORM =
      TransactionMapper.toTypeORM(transaction);
    transactionTypeORM = await this.transactionRepository.save(
      transactionTypeORM,
    );
    if (transactionTypeORM == null) {
      return transactionId;
    }
    transactionId = Number(transactionTypeORM.id);
    transaction.changeId(TransactionId.of(transactionId));
    transaction = this.publisher.mergeObjectContext(transaction);
    transaction.deposit();
    transaction.commit();
    return transactionId;
  }
}
