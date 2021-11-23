import { GetBillingQuery } from "../../queries/get-billing.query";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { getManager } from "typeorm";
import { GetBillingsDto } from "../../dtos/queries/get-billings.dto";

@QueryHandler(GetBillingQuery)
export class GetBillingsHandler implements IQueryHandler<GetBillingQuery> {
  constructor() {}

  async execute(query: GetBillingQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
        b.id,
        b.patient_id,
        b.code,
        b.amount,
        b.description,
        b.date
    FROM 
        billings b
    ORDER BY
        b.id;`;

    const ormBillings = await manager.query(sql);
    if (ormBillings.length <= 0) {
      return [];
    }
    const billings: GetBillingsDto[] = ormBillings.map(function (ormBilling) {
      const billingDto = new GetBillingsDto();
      billingDto.id = Number(ormBilling.id);
      billingDto.patientId = Number(ormBilling.patient_id);
      billingDto.code = ormBilling.code;
      billingDto.amount = Number(ormBilling.amount);
      billingDto.description = ormBilling.description;
      billingDto.date = ormBilling.date;
      return billingDto;
    });
    return billings;
  }
}