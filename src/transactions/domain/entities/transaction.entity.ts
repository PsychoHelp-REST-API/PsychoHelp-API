import { AggregateRoot } from '@nestjs/cqrs';
import { TransactionType } from '../enums/transaction-type.enum';
import { TransactionId } from '../value-objects/transaction-id.value';
import { TransactionStatus } from '../enums/transaction.status.enum';
import { PaymentId } from '../../../payment/domain/value-objects/payment-id.value';
import { Money } from '../../../common/domain/value-objects/money.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { MoneyDeposited } from '../events/money-deposited.event';
import { MoneyWithdrawn } from '../events/money-withdrawn.event';
import { MoneyTransferred } from '../events/money-transferred.event';

export class Transaction extends AggregateRoot {
  private id: TransactionId;
  private readonly type: TransactionType;
  private readonly status: TransactionStatus;
  private readonly paymentFrom: PaymentId;
  private readonly paymentTo: PaymentId;
  private readonly amount: Money;
  private readonly auditTrail: AuditTrail;

  public constructor(
    type: TransactionType,
    status: TransactionStatus,
    paymentFrom: PaymentId,
    paymentTo: PaymentId,
    amount: Money,
    auditTrail: AuditTrail,
  ) {
    super();
    this.type = type;
    this.status = status;
    this.paymentFrom = paymentFrom;
    this.paymentTo = paymentTo;
    this.amount = amount;
    this.auditTrail = auditTrail;
  }

  public deposit() {
    const event = new MoneyDeposited(
      this.id.getValue(),
      this.paymentFrom.getValue(),
      this.amount.getAmount(),
      this.status,
      null,
    );
    this.apply(event);
  }

  public withdraw() {
    const event = new MoneyWithdrawn(
      this.id.getValue(),
      this.paymentFrom.getValue(),
      this.amount.getAmount(),
      this.status,
      null,
    );
    this.apply(event);
  }

  public transfer() {
    const event = new MoneyTransferred(
      this.id.getValue(),
      this.paymentFrom.getValue(),
      this.paymentTo.getValue(),
      this.amount.getAmount(),
      this.status,
      null,
    );
    this.apply(event);
  }

  public getId(): TransactionId {
    return this.id;
  }

  public getType(): TransactionType {
    return this.type;
  }

  public getStatus(): TransactionStatus {
    return this.status;
  }

  public getPaymentFrom(): PaymentId {
    return this.paymentFrom;
  }

  public getPaymentTo(): PaymentId {
    return this.paymentTo;
  }

  public getAmount(): Money {
    return this.amount;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: TransactionId) {
    this.id = id;
  }
}
