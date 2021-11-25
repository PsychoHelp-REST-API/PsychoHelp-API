import { Observer } from "./abstract/observer";
import { Subject } from "./abstract/subject";

export class ObserverAttending implements Observer {
  update(subject: Subject): void {
    console.log('ObserverAttending: Reacted to the event.');
    console.log('Bounded Context Attending has been notified');
  }
}