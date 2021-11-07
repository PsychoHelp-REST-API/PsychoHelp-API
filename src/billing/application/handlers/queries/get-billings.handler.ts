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
      id,
      // TODO: implementar nombre del paciente
      code,
      description,
      amount,
      dateTime
    FROM 
      billings
    ORDER BY
       // TODO: implementar nombre del paciente
      `;
    const ormBillings = await manager.query(sql);
    if (ormBillings.length <= 0) {
      return[];
    }
    const billings: GetBillingsDto[] = ormBillings.map(function (ormBilling) {
      let billingDto = new GetBillingsDto();
      billingDto.id = Number(ormBilling.id);
      // TODO: implementar nombre del paciente
      billingDto.code = String(ormBilling.code);
      billingDto.description = String(ormBilling.description);
      billingDto.amount = Number(ormBilling.amount);
      billingDto.dateTime = String(ormBilling.dateTime);
    });
    return billings;
  }
}