import { Billing } from "../../domain/entities/billing.entity";
import { BillingTypeORM } from "../../infraestructure/persistence/typeorm/entities/billing.typeorm";
import { BillingIdTypeORM } from "../../infraestructure/persistence/typeorm/entities/billing.id.typeorm";
import { CodeTypeORM } from "../../infraestructure/persistence/typeorm/entities/code.typeorm";
import { DescriptionTypeORM } from "../../infraestructure/persistence/typeorm/entities/description.typeorm";
import { AmountTypeORM } from "../../infraestructure/persistence/typeorm/entities/billing.amount.typeorm";

export class BillingMapper {
  public static toTypeORM(billing: Billing): BillingTypeORM {
    const billingTypeORM: BillingTypeORM = new BillingTypeORM();
    billingTypeORM.id = BillingIdTypeORM.from(billing.getId().getBillId());
    // TODO: implementar el nombre del paciente en el mapper de billing
    //billingTypeORM.name = NameTypeORM.from(customer.getName().getFirstName(), customer.getName().getLastName());
    billingTypeORM.billingCode = CodeTypeORM.from(billing.getCode().getCode());
    billingTypeORM.description = DescriptionTypeORM.from(billing.getDescription());
    billingTypeORM.amount = AmountTypeORM.from(billing.getAmount().getAmount());
    return billingTypeORM;
  }
}