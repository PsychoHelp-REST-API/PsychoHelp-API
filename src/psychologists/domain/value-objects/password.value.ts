import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class Password {
  private readonly value: string;
  private static MIN_LENGTH: 8;
  private static MAX_LENGTH: 12;

  private constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }

  public static create(value: string): Result<AppNotification, Password> {
    let notification: AppNotification = new AppNotification();
    value = (value ?? '').trim();
    if (value === '') {
      notification.addError('password is required', null);
    }

    if (value.length > this.MAX_LENGTH) {
      notification.addError(
        'password field must have ' +
          Password.MAX_LENGTH +
          ' characters maximum',
        null,
      );
    }

    if (value.length < this.MIN_LENGTH) {
      notification.addError(
        'password field must have at least' +
          Password.MIN_LENGTH +
          'characters',
        null,
      );
    }

    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Password(value));
  }
}
