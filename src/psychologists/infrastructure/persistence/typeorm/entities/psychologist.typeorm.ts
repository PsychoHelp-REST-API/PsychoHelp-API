import { Column, Entity, Unique } from 'typeorm';
import { PsychologistIdTypeORM } from './psychologist.id.typeorm';
import { NameTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { DniTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/dni.typeorm';
import { EmailTypeORM } from './email.typeorm';
import { PasswordTypeORM } from './password.typeorm';
import { DescriptionTypeORM } from './description.typeorm';

@Entity('psychologists')
@Unique('UQ_customers_dni', ['dni.value'])
export class PsychologistTypeORM {
  @Column((type) => PsychologistIdTypeORM, { prefix: false })
  public id: PsychologistIdTypeORM;

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
