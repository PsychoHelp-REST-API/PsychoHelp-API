import { IEventHandler } from '@nestjs/cqrs';
import { PaymentOpened } from '../../../domain/events/payment-opened.event';
import { EventsHandler } from '@nestjs/cqrs/dist/utils/events-handler.decorator';

@EventsHandler(PaymentOpened)
export class PaymentOpenedHandler implements IEventHandler<PaymentOpened> {
  constructor() {}

  handle(event: PaymentOpened) {
    console.log('handle logic for PaymentOpened');
    console.log(event);
  }
}
