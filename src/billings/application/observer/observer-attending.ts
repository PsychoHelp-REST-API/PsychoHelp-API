import { Observer } from "../../domain/observer/observer";
import { Subject } from "../../domain/observer/subject";

export class ObserverAttending implements Observer {
  update(subject: Subject): void {
    console.log('ObserverAttending: Reacted to the event.');
    console.log('Bounded Context Attending has been notified');
  }
}