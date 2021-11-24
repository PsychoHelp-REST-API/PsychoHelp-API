import { Transaction } from '../../domain/entities/transaction.entity';
import { TransactionTypeORM } from '../../infrastructure/persistence/typeorm/entities/transaction.typeorm';
import { PaymentIdFromTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/payment-id-from.typeorm';
import { AmountTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/amount.typeorm';

export class TransactionMapper {
  public static toTypeORM(transaction: Transaction): TransactionTypeORM {
    const transactionTypeORM: TransactionTypeORM = new TransactionTypeORM();
    transactionTypeORM.type = transaction.getType();
    transactionTypeORM.status = transaction.getStatus();
    transactionTypeORM.paymentIdFrom = PaymentIdFromTypeORM.from(
      transaction.getPaymentFrom().getValue(),
    );
    transactionTypeORM.paymentIdTo =
      transaction.getPaymentTo() != null
        ? PaymentIdFromTypeORM.from(transaction.getPaymentTo().getValue())
        : null;
    transactionTypeORM.amount = AmountTypeORM.from(
      transaction.getAmount().getAmount(),
      transaction.getAmount().getCurrency(),
    );
    return transactionTypeORM;
  }
}
