import { AggregateRoot } from "@nestjs/cqrs";
import { BillingId } from "../value-objects/billing-id.value";
import { Name } from "../value-objects/name.value";
import { BillingCode } from "../value-objects/billing-code.value";
import { Datetime } from "../value-objects/date-time.value";
import { Money } from "../../../common/domain/value-objects/money.value";


export class Billing extends AggregateRoot {
  private billingId: BillingId;
  // TODO: vincular con el bounded context de Patient para obtener el nombre del paciente
  private name: Name;
  private billingCode: BillingCode;
  private date: Datetime;
  private description: string;
  private amount: Money;

  public constructor(
    billingID: BillingId,
    name: Name,
    billingCode: BillingCode,
    date: Datetime,
    description: string,
    amount: Money) {
    super();
    this.billingId = billingID;
    this.name = name;
    this.billingCode = billingCode;
    this.date = date;
    this.description = description;
    this.amount = amount;
  }

  // TODO: implementar método register() para registrar una boleta
  public register() {

  }


  // Getter

  public getId(): BillingId {
    return this.billingId;
  }

  public getAmount(): Money {
    return this.amount;
  }

  public getDescription(): string {
    return this.description;
  }

  public getDate(): Datetime {
    return this.date;
  }

  public getCode(): BillingCode {
    return this.billingCode;
  }

  public getName(): Name {
    return this.name;
  }

  // Change

  public changeId(id: BillingId) {
    this.billingId = id;
  }

  public changeCode(billingCode: BillingCode) {
    this.billingCode = billingCode;
  }

  public changeAmount(amount: Money) {
    this.amount = amount;
  }

}