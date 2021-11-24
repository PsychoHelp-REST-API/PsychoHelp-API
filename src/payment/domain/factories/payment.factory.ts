import { PaymentNumber } from '../value-objects/payment-number.value';
import { Money } from '../../../common/domain/value-objects/money.value';
import { PsychologistId } from '../../../psychologists/domain/value-objects/psychologist-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { Payment } from '../entities/payment.entity';
import { PaymentId } from '../value-objects/payment-id.value';

export class PaymentFactory {
  public static createFrom(
    number: PaymentNumber,
    balance: Money,
    psychologistId: PsychologistId,
    auditTrail: AuditTrail,
  ): Payment {
    return new Payment(number, balance, psychologistId, auditTrail);
  }

  public static withId(
    paymentId: PaymentId,
    number: PaymentNumber,
    balance: Money,
    psychologistId: PsychologistId,
    auditTrail: AuditTrail,
  ): Payment {
    const payment: Payment = new Payment(
      number,
      balance,
      psychologistId,
      auditTrail,
    );
    payment.changeId(paymentId);
    return payment;
  }
}
