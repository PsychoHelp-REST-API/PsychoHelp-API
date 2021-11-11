import { Column, Entity, Unique } from 'typeorm';
import { PatientIdTypeORM } from './patient.id.typeorm';
import { NameTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { DniTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/dni.typeorm';
import { EmailTypeORM } from '../../../../../psychologists/infrastructure/persistence/typeorm/entities/email.typeorm';
import { PasswordTypeORM } from '../../../../../psychologists/infrastructure/persistence/typeorm/entities/password.typeorm';

@Entity('patients')
@Unique('UQ_patients_dni', ['dni.value'])
export class PatientTypeORM {
  @Column((type) => PatientIdTypeORM, { prefix: false })
  public id: PatientIdTypeORM;

  @Column((type) => NameTypeORM, { prefix: false })
  public name: NameTypeORM;

  @Column((type) => DniTypeORM, { prefix: false })
  public dni: DniTypeORM;

  @Column((type) => EmailTypeORM, { prefix: false })
  public email: EmailTypeORM;

  @Column((type) => PasswordTypeORM, { prefix: false })
  public password: PasswordTypeORM;
}
