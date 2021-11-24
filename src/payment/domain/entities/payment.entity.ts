import { AggregateRoot } from '@nestjs/cqrs';
import { PaymentId } from '../value-objects/payment-id.value';
import { PaymentNumber } from '../value-objects/payment-number.value';
import { Money } from '../../../common/domain/value-objects/money.value';
import { PsychologistId } from '../../../psychologists/domain/value-objects/psychologist-id.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { PaymentOpened } from '../events/payment-opened.event';

export class Payment extends AggregateRoot {
  private id: PaymentId;
  private readonly number: PaymentNumber;
  private balance: Money;
  private readonly psychologistId: PsychologistId;
  private readonly auditTrail: AuditTrail;

  public constructor(
    number: PaymentNumber,
    balance: Money,
    psychologistId: PsychologistId,
    auditTrail: AuditTrail,
  ) {
    super();
    this.number = number;
    this.balance = balance;
    this.psychologistId = psychologistId;
    this.auditTrail = auditTrail;
  }

  public open() {
    const event = new PaymentOpened(
      this.id.getValue(),
      this.number.getValue(),
      this.psychologistId.getValue(),
    );
    this.apply(event);
  }

  public deposit(amount: Money): Result<AppNotification, Payment> {
    const notification: AppNotification = this.validate(amount);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    this.balance = this.balance.add(amount);
    return Result.ok(this);
  }

  public withdraw(amount: Money): Result<AppNotification, Payment> {
    const notification: AppNotification = this.validate(amount);
    if (this.balance.getAmount() < amount.getAmount()) {
      notification.addError(
        'Cannot withdraw in the payment, amount is greater than balance',
        null,
      );
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    this.balance = this.balance.subtract(amount);
    return Result.ok(this);
  }

  public validate(amount: Money): AppNotification {
    const notification: AppNotification = new AppNotification();
    if (amount.getAmount() <= 0) {
      notification.addError('The amount must be greater than zero', null);
    }
    if (!this.hasIdentity()) {
      notification.addError('The account has no identity', null);
    }
    return notification;
  }

  public exist(): boolean {
    return this.id != null && this.id.getValue() > 0;
  }

  public doesNotExist(): boolean {
    return !this.exist();
  }

  public hasIdentity(): boolean {
    return this.number.getValue().trim().length > 0;
  }

  public getId(): PaymentId {
    return this.id;
  }

  public getNumber(): PaymentNumber {
    return this.number;
  }

  public getBalance(): Money {
    return this.balance;
  }

  public getPsychologistId(): PsychologistId {
    return this.psychologistId;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeId(id: PaymentId) {
    this.id = id;
  }
}
