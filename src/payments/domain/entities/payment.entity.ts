import { AggregateRoot } from "@nestjs/cqrs";
import { PaymentId } from "../value-objects/payment-id.value";
import { PaymentStatus } from "../enums/payment-status.enum";
import { AccountId } from "../../../accounts/domain/value-objects/account-id.value";
import { Money } from "../../../common/domain/value-objects/money.value";
import { MoneyDeposited } from "../events/money-deposited.event";


export class Payment extends AggregateRoot {
  private id: PaymentId;
  private readonly status: PaymentStatus;
  private readonly accountTo: AccountId;
  private readonly amount: Money;

  public constructor(status: PaymentStatus, accountTo: AccountId, amount: Money) {
    super();
    this.status = status;
    this.accountTo = accountTo;
    this.amount = amount;
  }

  public deposit() {
    const event = new MoneyDeposited(this.id.getValue(), this.accountTo.getValue(), this.amount.getAmount() ,this.status, null);
    this.apply(event);
  }

  public getId(): PaymentId {
    return this.id;
  }

  public getStatus(): PaymentStatus {
    return this.status;
  }

  public getAccountTo(): AccountId {
    return this.accountTo;
  }

  public getAmount(): Money {
    return this.amount;
  }

  public changeId(id: PaymentId){
    this.id = id;
  }

}