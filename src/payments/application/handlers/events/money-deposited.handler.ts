import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { MoneyDeposited } from "../../../domain/events/money-deposited.event";

@EventsHandler(MoneyDeposited)
export class MoneyDepositedHandler
  implements IEventHandler<MoneyDeposited>{
  constructor() {
  }

  async handle(event: MoneyDeposited){
    console.log('Payment BC - handle MoneyDeposited');
  }
}