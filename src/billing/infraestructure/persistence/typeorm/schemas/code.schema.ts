import { EntitySchemaColumnOptions } from "typeorm";

export const CodeSchema = {
  code: {
    type: String,
    length: 9,
  } as EntitySchemaColumnOptions
};