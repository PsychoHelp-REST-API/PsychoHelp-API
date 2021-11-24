import { EventsHandler } from '@nestjs/cqrs/dist/utils/events-handler.decorator';
import { MoneyTransferred } from '../../../../transactions/domain/events/money-transferred.event';
import { CommandBus, IEventHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTypeORM } from '../../../infrastructure/persistence/typeorm/entities/payment.typeorm';
import { getManager, Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { PaymentNumber } from '../../../domain/value-objects/payment-number.value';
import { Money } from '../../../../common/domain/value-objects/money.value';
import { Payment } from '../../../domain/entities/payment.entity';
import { PaymentFactory } from '../../../domain/factories/payment.factory';
import { PaymentId } from '../../../domain/value-objects/payment-id.value';
import { PsychologistId } from '../../../../psychologists/domain/value-objects/psychologist-id.value';
import { Currency } from '../../../../common/domain/enums/currency.enum';
import { PaymentMapper } from '../../mappers/payment.mapper';
import { CompleteTransaction } from '../../../../transactions/application/commands/complete-transaction.command';

@EventsHandler(MoneyTransferred)
export class MoneyTransferredHandler
  implements IEventHandler<MoneyTransferred>
{
  constructor(
    @InjectRepository(PaymentTypeORM)
    private paymentRepository: Repository<PaymentTypeORM>,
    private commandBus: CommandBus,
  ) {}

  async handle(event: MoneyTransferred) {
    console.log('Accounts BC - handle MoneyTransferred');
    let fromPaymentTypeORM: PaymentTypeORM = await this.paymentRepository
      .createQueryBuilder()
      .where('id = :id')
      .setParameter('id', Number(event.paymentIdFrom))
      .getOne();
    if (fromPaymentTypeORM == null) {
      console.log('MoneyTransferred fromAccountTypeORM not found');
      return;
    }
    let toPaymentTypeORM: PaymentTypeORM = await this.paymentRepository
      .createQueryBuilder()
      .where('id = :id')
      .setParameter('id', Number(event.paymentIdTo))
      .getOne();
    if (toPaymentTypeORM == null) {
      console.log('MoneyTransferred toPaymentTypeORM not found');
      return;
    }
    const fromPaymentNumberResult: Result<AppNotification, PaymentNumber> =
      PaymentNumber.create(fromPaymentTypeORM.number.value);
    if (fromPaymentNumberResult.isFailure()) {
      return;
    }
    const toPaymentNumberResult: Result<AppNotification, PaymentNumber> =
      PaymentNumber.create(toPaymentTypeORM.number.value);
    if (toPaymentNumberResult.isFailure()) {
      return;
    }
    const fromPaymentAmount: Money = Money.create(
      fromPaymentTypeORM.balance.balance,
      fromPaymentTypeORM.balance.currency,
    );
    const fromPayment: Payment = PaymentFactory.withId(
      PaymentId.of(fromPaymentTypeORM.id),
      fromPaymentNumberResult.value,
      fromPaymentAmount,
      PsychologistId.of(fromPaymentTypeORM.psychologistId.value),
      null,
    );

    const toPaymentAmount: Money = Money.create(
      toPaymentTypeORM.balance.balance,
      toPaymentTypeORM.balance.currency,
    );
    const toPayment: Payment = PaymentFactory.withId(
      PaymentId.of(toPaymentTypeORM.id),
      toPaymentNumberResult.value,
      toPaymentAmount,
      PaymentId.of(toPaymentTypeORM.psychologistId.value),
      null,
    );

    const transferAmount: Money = Money.create(event.amount, Currency.SOLES);

    const withdrawResult: Result<AppNotification, Payment> =
      fromPayment.withdraw(transferAmount);
    const depositResult: Result<AppNotification, Payment> =
      toPayment.deposit(transferAmount);

    if (withdrawResult.isFailure() || depositResult.isFailure()) {
      console.log('MoneyTransferred error');
      return;
    }

    fromPaymentTypeORM = PaymentMapper.toTypeORM(fromPayment);
    toPaymentTypeORM = PaymentMapper.toTypeORM(toPayment);

    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(fromPaymentTypeORM);
      await transactionalEntityManager.save(toPaymentTypeORM);
      if (fromPaymentTypeORM == null || toPaymentTypeORM == null) {
        console.log('MoneyTransferred error');
        return;
      }
      const completeTransaction: CompleteTransaction = new CompleteTransaction(
        event.transactionId,
      );
      await this.commandBus.execute(completeTransaction);
    });
  }
}
