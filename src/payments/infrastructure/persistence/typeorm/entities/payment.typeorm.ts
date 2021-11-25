import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AccountIdToTypeORM } from "../value-objects/account-id-to.typeorm";
import { AmountTypeORM } from "../value-objects/amount.typeorm";
import { PaymentStatus } from "../../../../domain/enums/payment-status.enum";

@Entity('payments')
export class PaymentTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column((type) => AccountIdToTypeORM, { prefix: false })
  public accountIdTo: AccountIdToTypeORM;

  @Column((type) => AmountTypeORM, { prefix: false })
  public amount: AmountTypeORM;

  @Column('tinyint', { name: 'status', width: 2, unsigned: true, nullable: false, })
  public status: PaymentStatus;

}