import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { TransferMoney } from '../../commands/transfer-money.command';
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

@CommandHandler(TransferMoney)
export class TransferMoneyHandler implements ICommandHandler<TransferMoney> {
  constructor(
    @InjectRepository(PaymentTypeORM)
    private paymentRepository: Repository<PaymentTypeORM>,
    @InjectRepository(TransactionTypeORM)
    private transactionRepository: Repository<TransactionTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: TransferMoney) {
    let transactionId = 0;
    const fromPaymentNumber: string = command.fromPaymentNumber.trim();
    const fromPaymentTypeORM: PaymentTypeORM = await this.paymentRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .useTransaction(true)
      .where('number = :number')
      .setParameter('number', fromPaymentNumber)
      .getOne();
    if (fromPaymentTypeORM == null) {
      return transactionId;
    }
    const toPaymentNumber: string = command.toPaymentNumber.trim();
    const toPaymentTypeORM: PaymentTypeORM = await this.paymentRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .useTransaction(true)
      .where('number = :number')
      .setParameter('number', toPaymentNumber)
      .getOne();
    if (toPaymentTypeORM == null) {
      return transactionId;
    }
    const paymentIdFrom: PaymentId = PaymentId.of(fromPaymentTypeORM.id);
    const paymentIdTo: PaymentId = PaymentId.of(toPaymentTypeORM.id);
    const amount: Money = Money.create(command.amount, Currency.SOLES);
    let transaction: Transaction = TransactionFactory.createFrom(
      TransactionType.TRANSFER,
      TransactionStatus.STARTED,
      paymentIdFrom,
      paymentIdTo,
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
    transaction.transfer();
    transaction.commit();
    return transactionId;
  }
}
