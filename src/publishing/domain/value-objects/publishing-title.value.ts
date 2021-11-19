import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";

export class PublishingTitle {
  private readonly  publishingTitle: string;

  private constructor(publishingTitle: string) {
    this.publishingTitle = publishingTitle;
  }

  public getTitle(): string {
    return this.publishingTitle;
  }

  public static createTitle(publishingTitle: string): Result<AppNotification, PublishingTitle>
  {
    let notification : AppNotification = new AppNotification();
    publishingTitle = (publishingTitle ?? "").trim();
    if (publishingTitle === "") {
      notification.addError('Publishing title is required', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new PublishingTitle(publishingTitle));
  }
}