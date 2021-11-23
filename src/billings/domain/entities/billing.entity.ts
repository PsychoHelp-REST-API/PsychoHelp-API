import { AggregateRoot } from "@nestjs/cqrs";
import { BillingId } from "../value-objects/billing-id.value";
import { BillingCode } from "../value-objects/billing-code.value";
import { Description } from "../value-objects/description.value";
import { BillingIssuedEvent } from "../events/billing-issued.event";
import { BillingDate } from "../value-objects/billing-date.value";
import { Money } from "../value-objects/money.value";
import { PatientId } from "../../../patients/domain/value-objects/patient-id.value";
import { AppNotification } from "../../../common/application/app.notification";

export class Billing extends AggregateRoot {
  private id: BillingId;
  private readonly patientId: PatientId;
  private readonly code: BillingCode;
  private readonly amount: Money;
  private readonly description: Description;
  private readonly date: BillingDate;

  public constructor(
    patientId: PatientId,
    code: BillingCode,
    amount: Money,
    description: Description,
    date: BillingDate) {
    super();
    this.patientId = patientId;
    this.code = code;
    this.amount = amount;
    this.description = description;
    this.date = date;
  }

  public issue() {
    const event = new BillingIssuedEvent(
      this.id.getValue(),
      this.patientId.getValue(),
      this.code.getCode(),
      this.amount.getAmount(),
      this.description.getDescription(),
      this.date.getDate()
    );
    this.apply(event);
  }

  public validate(amount: Money): AppNotification {
    const notification: AppNotification = new AppNotification();
    if (amount.getAmount() <= 0) {
      notification.addError('The amount must be greater than zero', null);
    }
    return notification;
  }

  public getId(): BillingId {
    return this.id;
  }

  public getPatientId(): PatientId {
    return this.patientId;
  }

  public getCode(): BillingCode {
    return this.code;
  }

  public getAmount(): Money {
    return this.amount;
  }

  public getDescription(): Description {
    return this.description;
  }

  public getDate(): BillingDate {
    return this.date;
  }

  public changeId(id: BillingId) {
    this.id = id;
  }
}