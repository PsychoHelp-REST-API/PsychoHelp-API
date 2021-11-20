import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class Description{
  private readonly description: string;

  private constructor(description:string) {
    this.description = description;
  }
  public getDescription(): string{
    return this.description;
  }

  public static create(
    description: string
  ): Result<AppNotification, Description>{
    const notification: AppNotification = new AppNotification();
    description = (description ?? '').trim();
    if (description === '') {
      notification.addError('description is required', null);
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Description(description));
}
}