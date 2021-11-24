import { Payment } from '../entities/payment.entity';
import { Money } from '../../../common/domain/value-objects/money.value';

export class MoneyTransferService {
  public transfer(fromPayment: Payment, toPayment: Payment, amount: Money) {}
}
