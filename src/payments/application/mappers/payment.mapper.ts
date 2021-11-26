import { Payment } from "../../domain/entities/payment.entity";
import { PaymentTypeORM } from "../../infrastructure/persistence/typeorm/entities/payment.typeorm";
import { AccountIdToTypeORM } from "../../infrastructure/persistence/typeorm/value-objects/account-id-to.typeorm";
import { AmountTypeORM } from "../../infrastructure/persistence/typeorm/value-objects/amount.typeorm";

export class PaymentMapper {
  public static toTypeORM(payment:Payment): PaymentTypeORM {
    const paymentTypeORM: PaymentTypeORM = new PaymentTypeORM();
    paymentTypeORM.status = payment.getStatus();
    paymentTypeORM.accountIdTo = payment.getAccountTo() != null ? AccountIdToTypeORM.from(payment.getAccountTo().getValue()) : null;
    paymentTypeORM.amount = AmountTypeORM.from(payment.getAmount().getAmount(), payment.getAmount().getCurrency());
    return paymentTypeORM;
  }
}