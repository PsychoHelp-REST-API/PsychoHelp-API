import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class BillingDate {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public getDate(): string {
    return this.value;
  }

  public static create(value: string): Result<AppNotification, BillingDate> {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value === "") {
      notification.addError('date is required', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new BillingDate(value));
  }
}