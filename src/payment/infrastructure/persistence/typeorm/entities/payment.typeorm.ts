import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { PaymentNumberTypeORM } from '../value-objects/payment-number.typeorm';
import { BalanceTypeORM } from '../value-objects/balance.typeorm';
import { PsychologistIdTypeORM } from '../value-objects/psychologist-id.typeorm';
import { AuditTrailTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

@Entity('payments')
@Unique('UQ_payments_number', ['number.value'])
export class PaymentTypeORM {
  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'id',
    unsigned: true,
  })
  public id: number;

  @Column((type) => PaymentNumberTypeORM, { prefix: false })
  public number: PaymentNumberTypeORM;

  @Column((type) => BalanceTypeORM, { prefix: false })
  public balance: BalanceTypeORM;

  @Column((type) => PsychologistIdTypeORM, { prefix: false })
  public psychologistId: PsychologistIdTypeORM;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;
}
