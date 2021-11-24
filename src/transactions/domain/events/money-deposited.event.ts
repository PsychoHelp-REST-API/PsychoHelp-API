import { TransactionStatus } from '../enums/transaction.status.enum';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';

export class MoneyDeposited {
  constructor(
    public readonly transactionId: number,
    public readonly paymentIdFrom: number,
    public readonly amount: number,
    public readonly status: TransactionStatus,
    public readonly createdAt: DateTime,
  ) {}
}
