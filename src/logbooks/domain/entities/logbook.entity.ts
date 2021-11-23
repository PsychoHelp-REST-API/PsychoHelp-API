import { AggregateRoot } from '@nestjs/cqrs';
import { Id } from '../../../common/domain/value-objects/id.value';
import { Name } from '../../../common/domain/value-objects/name.value';
import { MedicalRecord } from '../value-objects/medical-record.value';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { LogbookCreateEvent } from '../events/logbook-create.event';
import { PatientId } from '../value-objects/psychologist-id.value';
import { ConsultationReason } from '../value-objects/consultation-reason.value';
import { DescriptionTypeorm } from '../../infrastructure/persistence/typeorm/value-objects/description.typeorm';
import { Description } from '../value-objects/description.value';

export class Logbook extends AggregateRoot{
  private id: Id;
  private consultationReason: ConsultationReason;
  private patientId: PatientId;
  private description: Description;

  public constructor(
    id: Id,
    consultationReason: ConsultationReason,
    description: Description,
    patientId: PatientId

  ) {
    super();
    this.id = id;
    this.consultationReason = consultationReason;
    this.description = description;
    this.patientId = patientId;
  }

  public create(){
    const event = new LogbookCreateEvent(
      this.id.getValue(),
      this.consultationReason.getConsultationReason(), this.description.getDescription(), this.patientId.getValue()
    );
    this.apply(event);
  }
  public getId(): Id{
    return this.id;
  }
  public getConsultationReason(): ConsultationReason{
    return this.consultationReason;
  }
  public getDescription(): Description{
    return this.description;
  }
  public getPsychologistId(): PatientId{
    return this.patientId;
  }
  public changeId(id: Id) {
    this.id = id;
  }
}