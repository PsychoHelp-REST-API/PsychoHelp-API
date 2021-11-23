import { AppNotification } from "../../../common/application/app.notification";
import { Result } from "typescript-result";

export class BillingCode {
  private readonly value: string;
  private static MAX_LENGTH: number = 9;

  private constructor(value: string) {
    this.value = value;
  }

  public static createCode(value: string): Result<AppNotification, BillingCode>
  {
    let notification: AppNotification = new AppNotification();
    value = (value ?? "").trim();
    if (value === "") {
      notification.addError('bill code is required', null);
    }
    if (value.length > this.MAX_LENGTH) {
      notification.addError('bill code field must have ' + this.MAX_LENGTH + ' digits', null);
    }
    const regExp = new RegExp('^[0-9]+$');
    if (regExp.test(value) === false) {
      notification.addError('bill code format is invalid', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new BillingCode(value));
  }

  public getCode(): string {
    return this.value;
  }
}