import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";

export class Email {
  private value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(email: string): Result<AppNotification, Email>
  {
    let notification: AppNotification = new AppNotification();
    email = (email ?? "").trim();
    const emailMaxLength = 150;
    if (email === "") {
      notification.addError('address is required', null);
    }
    if (email.length > emailMaxLength) {
      notification.addError('The maximum length of an email is ' + emailMaxLength + ' characters including spaces', null);
    }
    const regExp = new RegExp('^(.+)@(.+)$');
    if (regExp.test(email) === false) {
      notification.addError('email format is invalid', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Email(email));
  }
}