import { Psychologist } from '../entities/psychologist.entity';
import { PsychologistId } from '../value-objects/psychologist-id.value';
import { Name } from '../../../common/domain/value-objects/name.value';
import { Dni } from '../value-objects/dni.value';
import { Email } from '../../../common/domain/value-objects/email.value';
import { Password } from '../value-objects/password.value';
import { Description } from '../value-objects/description.value';

export class PsychologistFactory {
  public static createFrom(
    name: Name,
    dni: Dni,
    email: Email,
    password: Password,
    description: Description,
  ): Psychologist {
    return new Psychologist(
      PsychologistId.create(0),
      name,
      dni,
      email,
      password,
      description,
    );
  }

  public static withId(
    psychologistId: PsychologistId,
    name: Name,
    dni: Dni,
    email: Email,
    password: Password,
    description: Description,
  ): Psychologist {
    return new Psychologist(
      psychologistId,
      name,
      dni,
      email,
      password,
      description,
    );
  }
}
