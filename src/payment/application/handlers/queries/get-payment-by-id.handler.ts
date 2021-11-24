import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPaymentByIdQuery } from '../../queries/get-payment-by-id.query';
import { getManager } from 'typeorm';
import { GetPaymentsDto } from '../../dtos/queries/get-payments.dto';

@QueryHandler(GetPaymentByIdQuery)
export class GetPaymentByIdHandler
  implements IQueryHandler<GetPaymentByIdQuery>
{
  constructor() {}

  async execute(query: GetPaymentByIdQuery) {
    const manager = getManager();
    const sql = `
    SELECT
      a.id,
      a.number,
      a.balance,
      a.psychologist_id,
      a.created_at,
      a.created_by,
      a.updated_at,
      a.updated_by
    FROM 
      payments a
    WHERE
      a.id = ?;`;
    const ormPayments = await manager.query(sql, [query.paymentId]);
    if (ormPayments.length <= 0) {
      return {};
    }
    const ormPayment = ormPayments[0];
    const paymentDto = new GetPaymentsDto();
    paymentDto.id = Number(ormPayment.id);
    paymentDto.number = ormPayment.number;
    paymentDto.balance = Number(ormPayment.balance);
    paymentDto.psychologistId = Number(ormPayment.psychologist_id);
    paymentDto.createdAt = ormPayment.created_at;
    paymentDto.createdBy = ormPayment.created_by;
    paymentDto.updatedAt = ormPayment.update_at;
    paymentDto.updatedBy = ormPayment.update_by;
    return paymentDto;
  }
}
