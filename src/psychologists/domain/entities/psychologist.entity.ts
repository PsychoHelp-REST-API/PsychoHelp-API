import { AggregateRoot } from '@nestjs/cqrs';
import { PsychologistId } from '../value-objects/psychologist-id.value';
import { Name } from '../../../common/domain/value-objects/name.value';
import { Email } from '../../../common/domain/value-objects/email.value';
import { Dni } from '../value-objects/dni.value';
import { Description } from '../value-objects/description.value';
import { Password } from '../value-objects/password.value';
import { PsychologistRegisteredEvent } from '../events/psychologist-registered.event';

export class Psychologist extends AggregateRoot {
  private id: PsychologistId;
  private name: Name;
  private dni: Dni;
  private email: Email;
  private password: Password;
  private description: Description;

  constructor(
    id: PsychologistId,
    name: Name,
    dni: Dni,
    email: Email,
    password: Password,
    description: Description,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.dni = dni;
    this.email = email;
    this.password = password;
    this.description = description;
  }

  public register() {
    const event = new PsychologistRegisteredEvent(
      this.id.getValue(),
      this.name.getFirstName(),
      this.name.getLastName(),
      this.dni.getValue(),
      this.email.getValue(),
      this.password.getValue(),
      this.description.getValue());
    this.apply(event);
  }

  public getId(): PsychologistId {
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

  public getDescription(): Description {
    return this.description;
  }

  public changeId(id: PsychologistId) {
    this.id = id;
  }

  public changeName(name: Name): void {
    this.name = name;
  }

  public changeDni(dni: Dni): void {
    this.dni = dni;
  }

  public changeEmail(email: Email): void {
    this.email = email;
  }

  public changePassword(password: Password): void {
    this.password = password;
  }

  public changeDescription(description: Description): void {
    this.description = description;
  }
}
