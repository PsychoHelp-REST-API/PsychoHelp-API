import { PaymentStatus } from "../enums/payment-status.enum";
import { AccountId } from "../../../accounts/domain/value-objects/account-id.value";
import { Money } from "../../../common/domain/value-objects/money.value";
import { Payment } from "../entities/payment.entity";

export class PaymentFactory {
  public static createFrom(status: PaymentStatus, accountIdTo: AccountId, amount: Money): Payment {
    return new Payment(status, accountIdTo, amount);
  }
}