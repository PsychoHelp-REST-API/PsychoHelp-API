import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { PatientIdTypeORM } from './patient.id.typeorm';
import { NameTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { DniTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/dni.typeorm';
import { EmailTypeORM } from '../../../../../psychologists/infrastructure/persistence/typeorm/entities/email.typeorm';
import { PasswordTypeORM } from '../../../../../psychologists/infrastructure/persistence/typeorm/entities/password.typeorm';

@Entity('patients')
@Unique('UQ_patients_dni', ['dni.value'])
export class PatientTypeORM {
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
}
