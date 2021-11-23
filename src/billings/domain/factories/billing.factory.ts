import { BillingId } from "../value-objects/billing-id.value";
import { BillingCode } from "../value-objects/billing-code.value";
import { Billing } from "../entities/billing.entity";
import { Description } from "../value-objects/description.value";
import { BillingDate } from "../value-objects/billing-date.value";
import { Money } from "../value-objects/money.value";
import { PatientId } from "../../../patients/domain/value-objects/patient-id.value";

export class BillingFactory {
  public static createFrom(
    patientId: PatientId,
    code: BillingCode,
    amount: Money,
    description: Description,
    date: BillingDate,
  ): Billing {
    return new Billing(
      patientId,
      code,
      amount,
      description,
      date
    );
  }

  public static withId(
    billingId: BillingId,
    patientId: PatientId,
    code: BillingCode,
    amount: Money,
    description: Description,
    date: BillingDate,
  ): Billing {
    let billing: Billing =
     new Billing(
      patientId,
      code,
      amount,
      description,
      date
     );
    billing.changeId(billingId);
    return billing;
  }

}