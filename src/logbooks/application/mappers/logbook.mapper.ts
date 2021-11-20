import { Logbook } from '../../domain/entities/logbook.entity';
import { LogbookTypeORM } from '../../infrastructure/persistence/typeorm/entities/logbook.typeorm';
import { LogbookIdTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/logbook.id.typeorm';
import { NameTypeORM } from '../../../common/infrastructure/persistence/typeorm/entities/name.typeorm';
import { ConsultationReasonTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/consultation-reason.typeorm';
import { PatientIdTypeorm } from '../../infrastructure/persistence/typeorm/value-objects/patient-id.typeorm';
import { DescriptionTypeorm } from '../../infrastructure/persistence/typeorm/value-objects/description.typeorm';

export class LogbookMapper{
  public static toTypeORM(logbook: Logbook): LogbookTypeORM {
    const logbookTypeORM: LogbookTypeORM = new LogbookTypeORM();
    logbookTypeORM.id = LogbookIdTypeORM.from(logbook.getId().getValue());
    logbookTypeORM.consultationReason = ConsultationReasonTypeORM.from(logbook.getConsultationReason().getConsultationReason());
    logbookTypeORM.patientId = PatientIdTypeorm.from(logbook.getPsychologistId().getValue());
    logbookTypeORM.description = DescriptionTypeorm.from(logbook.getDescription().getDescription());
    return logbookTypeORM;
  }
}