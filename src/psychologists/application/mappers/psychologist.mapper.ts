import { Psychologist } from '../../domain/entities/psychologist.entity';
import { PsychologistTypeORM } from '../../infrastructure/persistence/typeorm/entities/psychologist.typeorm';
import { PsychologistIdTypeORM } from '../../infrastructure/persistence/typeorm/entities/psychologist.id.typeorm';
import { NameTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { DniTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/dni.typeorm';
import { EmailTypeORM } from '../../infrastructure/persistence/typeorm/entities/email.typeorm';
import { PasswordTypeORM } from '../../infrastructure/persistence/typeorm/entities/password.typeorm';
import { DescriptionTypeORM } from '../../infrastructure/persistence/typeorm/entities/description.typeorm';

export class PsychologistMapper {
  public static toTypeORM(psychologist: Psychologist): PsychologistTypeORM {
    const psychologistTypeORM: PsychologistTypeORM = new PsychologistTypeORM();
    psychologistTypeORM.id = PsychologistIdTypeORM.from(
      psychologist.getId().getValue(),
    );
    psychologistTypeORM.name = NameTypeORM.from(
      psychologist.getName().getFirstName(),
      psychologist.getName().getLastName(),
    );
    psychologistTypeORM.dni = DniTypeORM.from(psychologist.getDni().getValue());
    psychologistTypeORM.email = EmailTypeORM.from(
      psychologist.getEmail().getValue(),
    );
    psychologistTypeORM.password = PasswordTypeORM.from(
      psychologist.getPassword().getValue(),
    );
    psychologistTypeORM.description = DescriptionTypeORM.from(
      psychologist.getDescription().getValue(),
    );
    return psychologistTypeORM;
  }
}
