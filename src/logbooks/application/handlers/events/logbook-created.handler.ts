import { EventsHandler } from '@nestjs/cqrs/dist/utils/events-handler.decorator';
import { LogbookCreateEvent } from '../../../domain/events/logbook-create.event';
import { IEventHandler } from '@nestjs/cqrs';


@EventsHandler(LogbookCreateEvent)
export class LogbookCreatedHandler implements IEventHandler<LogbookCreateEvent>{
  constructor() {}

  handle(event: LogbookCreateEvent) {
    console.log('handle logic for LogbookCreateEvent');
    console.log(event);
  }
}