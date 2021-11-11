import { Patient } from '../entities/patient.entity';
import { Name } from '../../../common/domain/value-objects/name.value';
import { Dni } from '../../../psychologists/domain/value-objects/dni.value';
import { Email } from '../../../common/domain/value-objects/email.value';
import { Password } from '../../../psychologists/domain/value-objects/password.value';
import { PatientId } from '../value-objects/patient-id.value';

export class PatientFactory {
  public static createForm(
    name: Name,
    dni: Dni,
    email: Email,
    password: Password,
  ): Patient {
    return new Patient(PatientId.create(0), name, dni, email, password);
  }

  public static withId(
    patientId: PatientId,
    name: Name,
    dni: Dni,
    email: Email,
    password: Password,
  ): Patient {
    return new Patient(patientId, name, dni, email, password);
  }
}
