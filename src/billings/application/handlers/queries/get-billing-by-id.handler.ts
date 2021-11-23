import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { getManager } from "typeorm";
import { GetBillingsDto } from "../../dtos/queries/get-billings.dto";
import { GetBillingByIdQuery } from "../../queries/get-billing-by-id.query";

@QueryHandler(GetBillingByIdQuery)
export class GetBillingByIdHandler implements IQueryHandler<GetBillingByIdQuery> {
  constructor() {}

  async execute(query: GetBillingByIdQuery) {
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
    WHERE
        b.id = ?;`;

    const ormBillings = await manager.query(sql, [query.billId]);
    if (ormBillings.length <= 0) {
      return {};
    }
    const ormBilling = ormBillings[0];
    let billingDto = new GetBillingsDto();
    billingDto.id = Number(ormBilling.id);
    billingDto.patientId = Number(ormBilling.patient_id);
    billingDto.code = ormBilling.code;
    billingDto.amount = Number(ormBilling.amount);
    billingDto.description = ormBilling.description;
    billingDto.date = ormBilling.date;
    return billingDto;
  }
}