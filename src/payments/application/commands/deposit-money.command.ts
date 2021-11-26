import { PaymentStatus } from "../../domain/enums/payment-status.enum";
import { DateTime } from "../../../common/domain/value-objects/date-time.value";

export class DepositMoney {
  constructor(
    public readonly accountNumber: string,
    public readonly amount: number,
    public readonly status: PaymentStatus,
    public readonly createdAt: DateTime
  ) {
  }
}