import { Observer } from "../../domain/observer/observer";
import { Subject } from "../../domain/observer/subject";

export class ObserverNotification implements Observer {
  update(subject: Subject): void {
    console.log('ObserverNotification: Reacted to the event.');
    console.log('Bounded Context Notification has been notified');
  }
}