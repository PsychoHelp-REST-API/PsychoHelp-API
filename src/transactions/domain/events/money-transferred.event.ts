import { TransactionStatus } from '../enums/transaction.status.enum';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';

export class MoneyTransferred {
  constructor(
    public readonly transactionId: number,
    public paymentIdFrom: number,
    public paymentIdTo: number,
    public amount: number,
    public status: TransactionStatus,
    public createdAt: DateTime,
  ) {}
}
