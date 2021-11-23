import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { BillingIssuedEvent } from "../../../domain/events/billing-issued.event";

@EventsHandler(BillingIssuedEvent)
export class BillingIssuedHandler
  implements IEventHandler<BillingIssuedEvent> {
  constructor() { }

  handle(event: BillingIssuedEvent) {
    console.log('handle logic for BillingIssuedEvent');
    console.log(event);
  }
}