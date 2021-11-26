import { Billing } from "../../domain/entities/billing.entity";
import { BillingTypeORM } from "../../infrastructure/persistence/typeorm/entities/billing.typeorm";
import { BillingIdTypeorm } from "../../infrastructure/persistence/typeorm/value-objects/billing-id.typeorm";
import { CodeTypeORM } from "../../infrastructure/persistence/typeorm/value-objects/code.typeorm";
import { DescriptionTypeORM } from "../../infrastructure/persistence/typeorm/value-objects/description.typeorm";
import { AmountTypeORM } from "../../infrastructure/persistence/typeorm/value-objects/amount.typeorm";
import { DateTypeORM } from "../../infrastructure/persistence/typeorm/value-objects/date.typeorm";
import { PatientIdTypeORM } from "../../../patients/infrastructure/persistence/typeorm/value-objects/patient.id.typeorm";

export class BillingMapper {
  public static toTypeORM(billing: Billing): BillingTypeORM {
    const billingTypeORM: BillingTypeORM = new BillingTypeORM();
    billingTypeORM.id = billing.getId() != null ? billing.getId().getValue() : 0;
    billingTypeORM.patientId = PatientIdTypeORM.from(billing.getPatientId().getValue());
    billingTypeORM.code = CodeTypeORM.from(billing.getCode().getCode());
    billingTypeORM.description = billing.getDescription() != null ? DescriptionTypeORM.from(billing.getDescription().getDescription()) : null;
    billingTypeORM.amount = AmountTypeORM.from(billing.getAmount().getAmount());
    billingTypeORM.date= billing.getDate() != null ? DateTypeORM.from(billing.getDate().getDate()) : null;
    return billingTypeORM;
  }
}