import { Patient } from '../../domain/entities/patient.entity';
import { PatientIdTypeORM } from '../../infrastructure/persistence/typeorm/entities/patient.id.typeorm';
import { PatientTypeORM } from '../../infrastructure/persistence/typeorm/entities/patient.typeorm';
import { NameTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { DniTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/dni.typeorm';
import { EmailTypeORM } from '../../../psychologists/infrastructure/persistence/typeorm/entities/email.typeorm';
import { PasswordTypeORM } from '../../../psychologists/infrastructure/persistence/typeorm/entities/password.typeorm';

export class PatientMapper {
  public static toTypeORM(patient: Patient): PatientTypeORM {
    const patientTypeORM: PatientTypeORM = new PatientTypeORM();
    patientTypeORM.id = PatientIdTypeORM.from(patient.getId().getValue());
    patientTypeORM.name = NameTypeORM.from(
      patient.getName().getFirstName(),
      patient.getName().getLastName(),
    );
    patientTypeORM.dni = DniTypeORM.from(patient.getDni().getValue());
    patientTypeORM.email = EmailTypeORM.from(patient.getEmail().getValue());
    patientTypeORM.password = PasswordTypeORM.from(
      patient.getPassword().getValue(),
    );
    return patientTypeORM;
  }
}
