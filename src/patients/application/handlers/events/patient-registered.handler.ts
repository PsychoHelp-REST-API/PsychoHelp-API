import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PatientRegisteredEvent } from '../../../domain/events/patient-registered.event';

@EventsHandler(PatientRegisteredEvent)
export class PatientRegisteredHandler
  implements IEventHandler<PatientRegisteredEvent>
{
  constructor() {}

  handle(event: PatientRegisteredEvent) {
    console.log('handle logic for PatientRegisteredEvent');
    console.log(event);
  }
}
