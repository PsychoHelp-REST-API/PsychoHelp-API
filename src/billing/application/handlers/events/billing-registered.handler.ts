import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { BillingRegisteredEvent } from "../../../domain/events/billing-registered.event";

@EventsHandler(BillingRegisteredEvent)
export class BillingRegisteredHandler implements IEventHandler<BillingRegisteredEvent> {
  constructor() { }

  handle(event: BillingRegisteredEvent): any {
    console.log('handle logic for BillingRegisteredEvent');
    console.log(event);
  }
}