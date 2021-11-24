import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { OpenPayment } from '../../commands/open-payment.command';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTypeORM } from '../../../infrastructure/persistence/typeorm/entities/payment.typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../common/application/app.notification';
import { PaymentNumber } from '../../../domain/value-objects/payment-number.value';
import { Money } from '../../../../common/domain/value-objects/money.value';
import { Currency } from '../../../../common/domain/enums/currency.enum';
import { PsychologistId } from '../../../../psychologists/domain/value-objects/psychologist-id.value';
import { Payment } from '../../../domain/entities/payment.entity';
import { PaymentFactory } from '../../../domain/factories/payment.factory';
import { PaymentMapper } from '../../mappers/payment.mapper';
import { PaymentId } from '../../../domain/value-objects/payment-id.value';

@CommandHandler(OpenPayment)
export class OpenAccountHandler implements ICommandHandler<OpenPayment> {
  constructor(
    @InjectRepository(PaymentTypeORM)
    private paymentRepository: Repository<PaymentTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: OpenPayment) {
    let paymentId = 0;
    const paymentNumberResult: Result<AppNotification, PaymentNumber> =
      PaymentNumber.create(command.number);
    if (paymentNumberResult.isFailure()) {
      return paymentId;
    }
    const balance: Money = Money.create(0, Currency.SOLES);
    const psychologistId: PsychologistId = PsychologistId.of(
      command.psychologistId,
    );
    let payment: Payment = PaymentFactory.createFrom(
      paymentNumberResult.value,
      balance,
      psychologistId,
      null,
    );
    let paymentTypeORM: PaymentTypeORM = PaymentMapper.toTypeORM(payment);
    paymentTypeORM = await this.paymentRepository.save(paymentTypeORM);
    if (paymentTypeORM == null) {
      return paymentId;
    }
    paymentId = Number(paymentTypeORM.id);
    payment.changeId(PaymentId.of(paymentId));
    payment = this.publisher.mergeObjectContext(payment);
    payment.open();
    payment.commit();
    return paymentId;
  }
}
