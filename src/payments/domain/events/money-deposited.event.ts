import { PaymentStatus } from "../enums/payment-status.enum";
import { DateTime } from "../../../common/domain/value-objects/date-time.value";

export class MoneyDeposited {
  constructor(
    public readonly paymentId: number,
    public readonly accountIdTo: number,
    public readonly amount: number,
    public readonly status: PaymentStatus,
    public readonly createdAt: DateTime
  ) {
  }
}