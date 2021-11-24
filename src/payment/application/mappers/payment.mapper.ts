import { Payment } from '../../domain/entities/payment.entity';
import { PaymentTypeORM } from '../../infrastructure/persistence/typeorm/entities/payment.typeorm';
import { PaymentNumberTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/payment-number.typeorm';
import { BalanceTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/balance.typeorm';
import { PsychologistIdTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/psychologist-id.typeorm';
import { AuditTrailTypeORM } from '../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

export class PaymentMapper {
  public static toTypeORM(payment: Payment): PaymentTypeORM {
    const paymentTypeORM: PaymentTypeORM = new PaymentTypeORM();
    paymentTypeORM.id =
      payment.getId() != null ? payment.getId().getValue() : 0;
    paymentTypeORM.number =
      payment.getNumber() != null
        ? PaymentNumberTypeORM.from(payment.getNumber().getValue())
        : null;
    paymentTypeORM.balance =
      payment.getBalance() != null
        ? BalanceTypeORM.from(
            payment.getBalance().getAmount(),
            payment.getBalance().getCurrency(),
          )
        : null;
    paymentTypeORM.psychologistId =
      payment.getPsychologistId() != null
        ? PsychologistIdTypeORM.from(payment.getPsychologistId().getValue())
        : null;
    paymentTypeORM.auditTrail =
      payment.getAuditTrail() != null
        ? AuditTrailTypeORM.from(
            payment.getAuditTrail().getCreatedAt().format(),
            payment.getAuditTrail().getCreatedBy().getValue(),
            payment.getAuditTrail().getUpdatedAt().format(),
            payment.getAuditTrail().getUpdatedBy().getValue(),
          )
        : null;
    return paymentTypeORM;
  }
}
