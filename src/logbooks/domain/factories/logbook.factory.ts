import { Name } from '../../../common/domain/value-objects/name.value';
import { Logbook } from '../entities/logbook.entity';
import { Id } from '../../../common/domain/value-objects/id.value';
import { ConsultationReason } from '../value-objects/consultation-reason.value';
import { PatientId } from '../value-objects/psychologist-id.value';
import { Description } from '../value-objects/description.value';

export class LogbookFactory {
  public static createFrom(consultationReason: ConsultationReason,description: Description,patientId: PatientId){
    return new Logbook(Id.of(0), consultationReason, description, patientId);
  }
  public static withId(id: Id,  consultationReason: ConsultationReason,description: Description,patientId: PatientId) {
    return new Logbook(id, consultationReason, description, patientId);
  }
}