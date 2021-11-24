import { TransactionStatus } from '../../domain/enums/transaction.status.enum';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';

export class WithdrawMoney {
  constructor(
    public readonly paymentNumber: string,
    public readonly amount: number,
    public readonly status: TransactionStatus,
    public readonly createdAt: DateTime,
  ) {}
}
