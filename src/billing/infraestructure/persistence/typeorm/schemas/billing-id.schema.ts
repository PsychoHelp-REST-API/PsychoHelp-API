import { EntitySchemaColumnOptions } from "typeorm";

export const BillingIdPKSchema = {
  id: {
    type: 'bigint',
    primary: true,
    generated: true,
    unsigned: true,
  } as EntitySchemaColumnOptions
}