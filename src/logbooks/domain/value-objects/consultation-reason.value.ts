import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';

export class ConsultationReason{
  private readonly consultationReason: string;

  private constructor(consultationReason: string){
    this.consultationReason = consultationReason;
  }

  public getConsultationReason(): string{
    return this.consultationReason;
  }
  public static create(
    consultationReason: string
  ): Result<AppNotification, ConsultationReason>{
    const notification: AppNotification = new AppNotification();
    consultationReason = (consultationReason ?? '').trim();

    if (consultationReason === ''){
      notification.addError('consultation reason is require',null)
    }
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    return Result.ok(new ConsultationReason(consultationReason));

  }
}