import { TransactionType } from "../enums/transaction-type.enum";
import { TransactionStatus } from "../enums/transaction.status.enum";
import { PaymentId } from "../../../payment/domain/value-objects/payment-id.value";
import { Money } from "../../../common/domain/value-objects/money.value";
import { AuditTrail } from "../../../common/domain/value-objects/audit-trail.value";
import { Transaction } from "../entities/transaction.entity";

export class TransactionFactory {
  public static createFrom(
    type: TransactionType, status: TransactionStatus, paymentIdFrom: PaymentId, paymentIdTo: PaymentId, amount: Money, auditTrail: AuditTrail): Transaction {
    return new Transaction(type, status, paymentIdFrom, paymentIdTo, amount, auditTrail);
  }
}