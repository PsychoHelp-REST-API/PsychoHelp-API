import { AggregateRoot } from '@nestjs/cqrs';
import { Id } from '../../../common/domain/value-objects/id.value';
import { Name } from '../../../common/domain/value-objects/name.value';
import { MedicalRecord } from '../value-objects/medical-record.value';
import { DateTime } from '../../../common/domain/value-objects/date-time.value';
import { LogbookCreateEvent } from '../events/logbook-create.event';

export class Logbook extends AggregateRoot{
  private id: Id;
  private name: Name;
  private dateTime: DateTime;
  private medicalRecords: MedicalRecord[];

  public constructor(id:Id, name:Name, dateTime:DateTime) {
    super();
    this.id = id;
    this.name = name;
    this.dateTime = dateTime;
    this.medicalRecords = [];
  }

  public create(){
    const event = new LogbookCreateEvent(
      this.id.getValue(), this.name.getFirstName(), this.name.getLastName()
    );
    this.apply(event);
  }
  public getId():Id{
    return this.id;
  }
  public getName(): Name{
    return this.name;
  }
  public getDateTime(): DateTime{
    return this.dateTime;
  }
  public getMedicalRecords(): MedicalRecord[]{
    return this.medicalRecords;
  }
  public changeId(id: Id) {
    this.id = id;
  }
}