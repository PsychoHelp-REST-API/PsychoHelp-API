import { Column, Entity } from "typeorm";
import { Unique } from "typeorm/browser";
import { BillingIdTypeORM } from "./billing.id.typeorm";
import { CodeTypeORM } from "./code.typeorm";
import { AmountTypeORM } from "./billing.amount.typeorm";
import { DateTimeTypeORM } from "./date-time.typeorm";
import { DescriptionTypeORM } from "./description.typeorm";


@Entity('billings')
@Unique('UQ_billings_code', ['code.value'])
export class BillingTypeORM {
  @Column((type) => BillingIdTypeORM, { prefix: false })
  public id: BillingIdTypeORM;

  // TODO: implementar el nombre del paciente tipo ORM
  // @Column((type) => NameTypeORM, { prefix: false})
  // public name: NameTypeORM;

  @Column((type) => CodeTypeORM, { prefix: false })
  public billingCode: CodeTypeORM;

  @Column((type) => DescriptionTypeORM, {prefix:false})
  public description: DescriptionTypeORM;

  @Column((type) => DateTimeTypeORM, { prefix: false })
  public dateTime: DateTimeTypeORM;

  @Column((type) => AmountTypeORM, {prefix: false})
  public amount: AmountTypeORM;
}