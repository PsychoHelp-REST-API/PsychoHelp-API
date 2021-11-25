import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AccountNumberTypeORM } from '../value-objects/account-number.typeorm';
import { AccountIdTypeORM } from '../value-objects/account-id.typeorm';
import { BalanceTypeORM } from '../value-objects/balance.typeorm';
import { PsychologistIdTypeORM } from "../value-objects/psychologist-id.typeorm";

@Entity('accounts')
@Unique('UQ_accounts_number', ['number.value'])
export class AccountTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column((type) => AccountNumberTypeORM, { prefix: false })
  public number: AccountNumberTypeORM;

  @Column((type) => BalanceTypeORM, { prefix: false })
  public balance: BalanceTypeORM;

  @Column((type) => PsychologistIdTypeORM, {prefix: false})
  public psychologistId: PsychologistIdTypeORM;

}