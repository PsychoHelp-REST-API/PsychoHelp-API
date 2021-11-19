import { AggregateRoot } from "@nestjs/cqrs";
import { PublishingId } from "../value-objects/publishing-id.value";
import { PublishingTitle } from "../value-objects/publishing-title.value";
import { BillingDatetime } from "../../../billing/domain/value-objects/date-time.value";
import { PublishingDatetime } from "../value-objects/date-time.value";

export class Publishing extends AggregateRoot {
  private publishingId: PublishingId;
  // TODO: vincular con el BC de Psicologo para sacar el nombre
  private publishingTitle: PublishingTitle;
  private description: string;
  private image: string;
  private date: PublishingDatetime;

  public constructor(
    publishingId: PublishingId,
    publishingTitle: PublishingTitle,
    description: string,
    image: string,
    date: PublishingDatetime) {
    super();
    this.publishingId = publishingId;
    this.publishingTitle = publishingTitle;
    this.description = description;
    this.image = image;
    this.date = date;
  }

  // TODO: implementar register() para registrar un post

  public register() {

  }

  public getId(): PublishingId {
    return this.publishingId;
  }

  public getTitle(): PublishingTitle {
    return this.publishingTitle;
  }

  public getDescription(): string {
    return this.description;
  }

  public getImage(): string{
    return this.image;
  }

  public getDate(): PublishingDatetime {
    return this.date;
  }


  public changeId(id: PublishingId){
    this.publishingId = id;
  }

  public changeTitle(publishingTitle: PublishingTitle){
    this.publishingTitle = publishingTitle;
  }
}