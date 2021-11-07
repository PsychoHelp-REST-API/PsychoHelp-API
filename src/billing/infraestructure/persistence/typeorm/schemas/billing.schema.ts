import { EntitySchema } from "typeorm";
import { Billing } from "../../../../domain/entities/billing.entity";
import { BillingIdPKSchema } from "./billing-id.schema";
import { CodeSchema } from "./code.schema";
import { DescriptionSchema } from "./description.schema";
import { AmountSchema } from "./billing.amount.schema";
import { DateTimeSchema } from "./date-time.schema";

export const BillingSchema = new EntitySchema( {
  name: 'Billing',
  target: Billing,
  tableName: 'billings',
  columns: {
    ...BillingIdPKSchema,
    // TODO: implementar el nombre del paciente en este Schema
    ...CodeSchema,
    ...DescriptionSchema,
    ...AmountSchema,
    ...DateTimeSchema,
  },
  uniques: [
    {
      name: 'UQ_billings_code',
      columns: ['code'],
    },
  ],
});