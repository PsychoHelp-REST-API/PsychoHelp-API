import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { PsychologistIdTypeORM } from '../value-objects/psychologist.id.typeorm';
import { NameTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { DniTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/dni.typeorm';
import { EmailTypeORM } from '../value-objects/email.typeorm';
import { PasswordTypeORM } from '../value-objects/password.typeorm';
import { DescriptionTypeORM } from '../value-objects/description.typeorm';

@Entity('psychologists')
@Unique('UQ_customers_dni', ['dni.value'])
export class PsychologistTypeORM {
  @PrimaryGeneratedColumn('increment', {type: 'bigint', name: 'id', unsigned: true})
  public id: number;

  @Column((type) => NameTypeORM, { prefix: false })
  public name: NameTypeORM;

  @Column((type) => DniTypeORM, { prefix: false })
  public dni: DniTypeORM;

  @Column((type) => EmailTypeORM, { prefix: false })
  public email: EmailTypeORM;

  @Column((type) => PasswordTypeORM, { prefix: false })
  public password: PasswordTypeORM;

  @Column((type) => DescriptionTypeORM, { prefix: false })
  public description: DescriptionTypeORM;
}
