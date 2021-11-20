import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { NameTypeORM } from '../../../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { LogbookIdTypeORM } from '../value-objects/logbook.id.typeorm';
import { ConsultationReasonTypeORM } from '../value-objects/consultation-reason.typeorm';
import { PatientIdTypeorm } from '../value-objects/patient-id.typeorm';
import { DescriptionTypeorm } from '../value-objects/description.typeorm';


@Entity('logbooks')
@Unique('UQ_logbook_id', ['id.value'])
export class LogbookTypeORM{
  @Column((type) => LogbookIdTypeORM, { prefix: false })
  public id: LogbookIdTypeORM;

  @Column((type) => ConsultationReasonTypeORM, { prefix: false })
  public consultationReason: ConsultationReasonTypeORM;

  @Column((type) => DescriptionTypeorm, { prefix: false })
  public description: DescriptionTypeorm;

  @Column((type) => PatientIdTypeorm, { prefix: false })
  public patientId: PatientIdTypeorm;

}