import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTypeORM } from '../../infrastructure/persistence/typeorm/entities/payment.typeorm';
import { Repository } from 'typeorm';
import { OpenPaymentRequest } from '../dtos/request/open-payment-request.dto';
import { AppNotification } from '../../../common/application/app.notification';

@Injectable()
export class OpenPaymentValidator {
  constructor(
    @InjectRepository(PaymentTypeORM)
    private paymentRepository: Repository<PaymentTypeORM>,
  ) {}

  public async validate(
    openPaymentRequestDto: OpenPaymentRequest,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();
    const number: string = openPaymentRequestDto.number.trim();
    if (number.length <= 0) {
      notification.addError('Payment number is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const paymentTypeORM: PaymentTypeORM = await this.paymentRepository
      .createQueryBuilder()
      .where('number = :number', { number })
      .getOne();
    if (paymentTypeORM != null) {
      notification.addError('Payment number is taken', null);
    }
    return notification;
  }
}
