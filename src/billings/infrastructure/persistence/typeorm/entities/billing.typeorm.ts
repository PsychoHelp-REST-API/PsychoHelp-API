import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { BillingIdTypeorm } from "../value-objects/billing-id.typeorm";
import { CodeTypeORM } from "../value-objects/code.typeorm";
import { AmountTypeORM } from "../value-objects/amount.typeorm";
import { DateTypeORM } from "../value-objects/date.typeorm";
import { DescriptionTypeORM } from "../value-objects/description.typeorm";
import { PatientIdTypeORM } from "../value-objects/patient-id.typeorm";


@Entity('billings')
@Unique('UQ_billings_code', ['code.value'])
export class BillingTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column((type) => PatientIdTypeORM, {prefix: false})
  public patientId: PatientIdTypeORM;

  @Column((type) => CodeTypeORM, { prefix: false })
  public code: CodeTypeORM;

  @Column((type) => AmountTypeORM, {prefix: false})
  public amount: AmountTypeORM;

  @Column((type) => DescriptionTypeORM, {prefix:false})
  public description: DescriptionTypeORM;

  @Column((type) => DateTypeORM, {prefix:false})
  public date: DateTypeORM;
}