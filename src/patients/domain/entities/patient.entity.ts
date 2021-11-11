import { AggregateRoot } from '@nestjs/cqrs';
import { Name } from '../../../common/domain/value-objects/name.value';
import { Email } from '../../../common/domain/value-objects/email.value';
import { Dni } from '../../../psychologists/domain/value-objects/dni.value';
import { Password } from '../../../psychologists/domain/value-objects/password.value';
import { PatientId } from '../value-objects/patient-id.value';
import { PatientRegisteredEvent } from '../events/patient-registered.event';

export class Patient extends AggregateRoot {
  private id: PatientId;
  private name: Name;
  private dni: Dni;
  private email: Email;
  private password: Password;

  constructor(
    id: PatientId,
    name: Name,
    dni: Dni,
    email: Email,
    password: Password,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.dni = dni;
    this.email = email;
    this.password = password;
  }

  public register() {
    const event = new PatientRegisteredEvent(
      this.id.getValue(),
      this.name.getFirstName(),
      this.name.getLastName(),
      this.dni.getValue(),
      this.email.getValue(),
      this.password.getValue(),
    );
    this.apply(event);
  }

  public getId(): PatientId {
    return this.id;
  }

  public getName(): Name {
    return this.name;
  }

  public getDni(): Dni {
    return this.dni;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getPassword(): Password {
    return this.password;
  }

  public changeId(id: PatientId) {
    this.id = id;
  }
}
