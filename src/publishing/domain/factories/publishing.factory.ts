import { PublishingId } from '../value-objects/publishing-id.value';
import { PublishingTitle } from '../value-objects/publishing-title.value';
import { PublishingDatetime } from "../value-objects/date-time.value";
import { Publishing } from "../entities/publishing.entity";

export class PublishingFactory {
  public static createFrom(
    publishingId: PublishingId,
    title: PublishingTitle,
    description: string,
    image: string,
    date: PublishingDatetime,
  ): Publishing {
    return new Publishing(
      PublishingId.createPubId(0),
      title,
      description,
      image,
      date
    );
  }
}
