import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { MoneyTransferred } from '../../../domain/events/money-transferred.event';

@EventsHandler(MoneyTransferred)
export class MoneyTransferredHandler implements IEventHandler<MoneyTransferred>
{
  constructor() {}

  async handle(event: MoneyTransferred) {
    console.log('Transaction BC - handle MoneyTransferred');
  }
}
