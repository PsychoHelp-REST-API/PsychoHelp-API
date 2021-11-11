import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PsychologistRegisteredEvent } from '../../../domain/events/psychologist-registered.event';

@EventsHandler(PsychologistRegisteredEvent)
export class PsychologistRegisteredHandler
  implements IEventHandler<PsychologistRegisteredEvent>
{
  constructor() {}

  handle(event: PsychologistRegisteredEvent) {
    console.log('handle logic for PsychologistRegisteredEvent');
    console.log(event);
  }
}
