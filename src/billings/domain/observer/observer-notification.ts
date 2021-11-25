import { Observer } from "./abstract/observer";
import { Subject } from "./abstract/subject";

export class ObserverNotification implements Observer {
  update(subject: Subject): void {
    console.log('ObserverNotification: Reacted to the event.');
    console.log('Bounded Context Notification has been notified');
  }
}