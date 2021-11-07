import { BillingId } from "../value-objects/billing-id.value";
import { Name } from "../value-objects/name.value";
import { BillingCode } from "../value-objects/billing-code.value";
import { Datetime } from "../value-objects/date-time.value";
import { Money } from "../../../common/domain/value-objects/money.value";
import { Billing } from "../entities/billing.entity";


export class BillingFactory {
  public static createFrom(
    billingId: BillingId,
    name: Name,
    billingCode: BillingCode,
    date: Datetime,
    description: string,
    amount: Money
  ): Billing {
    return new Billing(
      BillingId.createBillId(0),
      name,
      billingCode,
      date,
      description,
      amount
    );
  }
}