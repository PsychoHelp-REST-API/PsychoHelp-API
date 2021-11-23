import { AppNotification } from "../../../common/application/app.notification";
import { Result } from "typescript-result";

export class Money {
  private readonly amount: number;

  private constructor(amount: number) {
    this.amount = amount;
  }

  public static create(amount: number): Result<AppNotification, Money> {
    const notification: AppNotification = new AppNotification();
    if (amount == null) notification.addError('Amount is required', null);

    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new Money(amount));
  }

  public getAmount(): number {
    return this.amount;
  }
}