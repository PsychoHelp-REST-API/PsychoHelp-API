import { EventsHandler } from '@nestjs/cqrs/dist/utils/events-handler.decorator';
import { MoneyDeposited } from '../../../../transactions/domain/events/money-deposited.event';
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

@EventsHandler(MoneyDeposited)
export class MoneyDepositedHandler implements IEventHandler<MoneyDeposited> {
  constructor(
    @InjectRepository(PaymentTypeORM)
    private paymentRepository: Repository<PaymentTypeORM>,
    private commandBus: CommandBus,
  ) {}

  async handle(event: MoneyDeposited) {
    let paymentTypeORM: PaymentTypeORM = await this.paymentRepository
      .createQueryBuilder()
      .where('id = :id')
      .setParameter('id', Number(event.paymentIdFrom))
      .getOne();
    if (paymentTypeORM == null) {
      console.log('MoneyDeposited accountTypeORM not found');
      return;
    }
    const paymentNumberResult: Result<AppNotification, PaymentNumber> =
      PaymentNumber.create(paymentTypeORM.number.value);
    if (paymentNumberResult.isFailure()) {
      return;
    }
    const paymentAmount: Money = Money.create(
      paymentTypeORM.balance.balance,
      paymentTypeORM.balance.currency,
    );
    const payment: Payment = PaymentFactory.withId(
      PaymentId.of(paymentTypeORM.id),
      paymentNumberResult.value,
      paymentAmount,
      PsychologistId.of(paymentTypeORM.psychologistId.value),
      null,
    );
    const depositAmount: Money = Money.create(event.amount, Currency.SOLES);
    const depositResult: Result<AppNotification, Payment> =
      payment.deposit(depositAmount);
    if (depositResult.isFailure()) {
      console.log('MoneyDeposited error');
      return;
    }
    paymentTypeORM = PaymentMapper.toTypeORM(payment);
    await getManager().transaction(async (transactionalEntityManager) => {
      paymentTypeORM = await this.paymentRepository.save(paymentTypeORM);
      if (paymentTypeORM == null) {
        console.log('MoneyDeposited error');
        return;
      }
      const completeTransaction: CompleteTransaction = new CompleteTransaction(
        event.transactionId,
      );
      await this.commandBus.execute(completeTransaction);
    });
  }
}
