import { AppNotification } from "../../../common/application/app.notification";
import { Result } from "typescript-result";

export class BillingCode {
  private readonly billingCode: string;
  private static MAX_LENGTH: number = 9;

  private constructor(billingCode: string) {
    this.billingCode = billingCode;
  }

  public getCode(): string {
    return this.billingCode;
  }

  public static createCode(billingCode: string): Result<AppNotification, BillingCode>
  {
    let notification: AppNotification = new AppNotification();
    billingCode = (billingCode ?? "").trim();
    if (billingCode === "") {
      notification.addError('billing code is required', null);
    }
    if (billingCode.length != this.MAX_LENGTH) {
      notification.addError('billing code field must have ' + BillingCode.MAX_LENGTH + ' digits', null);
    }
    const regExp = new RegExp('^[0-9]+$');
    if (regExp.test(billingCode) === false) {
      notification.addError('billing code format is invalid', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new BillingCode(billingCode));
  }
}