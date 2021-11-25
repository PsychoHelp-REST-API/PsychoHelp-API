import { AggregateRoot } from "@nestjs/cqrs";
import { AccountId } from "../value-objects/account-id.value";
import { AccountNumber } from "../value-objects/account-number.value";
import { Money } from "../../../common/domain/value-objects/money.value";
import { PsychologistId } from "../../../psychologists/domain/value-objects/psychologist-id.value";
import { AccountOpened } from "../events/account-opened.event";
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class Account extends AggregateRoot {
  private id: AccountId;
  private readonly number: AccountNumber;
  private balance: Money;
  private readonly psychologistId: PsychologistId;

  public constructor(number: AccountNumber, balance: Money, psychologistId: PsychologistId) {
    super();
    this.number = number;
    this.balance = balance;
    this.psychologistId = psychologistId;
  }

  public open() {
    const event = new AccountOpened(this.id.getValue(), this.number.getValue(), this.psychologistId.getValue());
    this.apply(event);
  }

  public deposit(amount: Money): Result<AppNotification, Account>{
    const notification: AppNotification = this.validate(amount);
    if(notification.hasErrors()) {
      return Result.error(notification);
    }
    this.balance = this.balance.add(amount);
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

  public getId(): AccountId {
    return this.id;
  }

  public getNumber(): AccountNumber {
    return this.number;
  }

  public getBalance(): Money {
    return this.balance;
  }

  public getPsychologistId(): PsychologistId {
    return this.psychologistId;
  }

  public changeId(id: AccountId) {
    this.id = id;
  }



}