import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentIdToTypeORM } from '../value-objects/payment-id-to.typeorm';
import { AmountTypeORM } from '../value-objects/amount.typeorm';
import { TransactionStatus } from '../../../../domain/enums/transaction.status.enum';
import { AuditTrailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';
import { PaymentIdFromTypeORM } from "../value-objects/payment-id-from.typeorm";

@Entity('transactions')
export class TransactionTypeORM {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  public id: number;

  @Column('char', { name: 'type', length: 1, nullable: false })
  public type: string;

  @Column((type) => PaymentIdFromTypeORM, { prefix: false })
  public paymentIdFrom: PaymentIdFromTypeORM;

  @Column((type) => PaymentIdToTypeORM, { prefix: false })
  public paymentIdTo: PaymentIdToTypeORM;

  @Column((type) => AmountTypeORM, { prefix: false })
  public amount: AmountTypeORM;

  @Column('tinyint', {
    name: 'status',
    width: 2,
    unsigned: true,
    nullable: false,
  })
  public status: TransactionStatus;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;
}
