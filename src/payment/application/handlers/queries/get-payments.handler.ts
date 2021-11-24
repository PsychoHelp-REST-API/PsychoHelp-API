import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPaymentsQuery } from '../../queries/get-payments.query';
import { getManager } from 'typeorm';
import { GetPaymentsDto } from '../../dtos/queries/get-payments.dto';

@QueryHandler(GetPaymentsQuery)
export class GetPaymentsHandler implements IQueryHandler<GetPaymentsQuery> {
  constructor() {}

  async execute(query: GetPaymentsQuery) {
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
    ORDER BY
      a.created_at DESC;`;
    const ormPayments = await manager.query(sql);
    if (ormPayments.length <= 0) {
      return [];
    }
    const payments: GetPaymentsDto[] = ormPayments.map(function (ormPayment) {
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
    });
    return payments;
  }
}
