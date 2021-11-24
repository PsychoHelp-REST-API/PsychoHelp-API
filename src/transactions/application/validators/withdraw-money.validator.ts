import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentTypeORM } from '../../../payment/infrastructure/persistence/typeorm/entities/payment.typeorm';
import { Repository } from 'typeorm';
import { WithdrawRequestDto } from '../dtos/request/withdraw-request';
import { AppNotification } from '../../../common/application/app.notification';

@Injectable()
export class WithdrawMoneyValidator {
  constructor(
    @InjectRepository(PaymentTypeORM)
    private paymentRepository: Repository<PaymentTypeORM>,
  ) {}

  public async validate(
    withdrawRequestDto: WithdrawRequestDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();
    const paymentNumber: string = withdrawRequestDto.paymentNumber.trim();
    if (paymentNumber.length <= 0) {
      notification.addError('Account number is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const paymentTypeORM: PaymentTypeORM = await this.paymentRepository
      .createQueryBuilder()
      .where('number = :number')
      .setParameter('number', paymentNumber)
      .getOne();
    if (paymentTypeORM == null) {
      notification.addError('Account number not found', null);
    }
    const amount: number = withdrawRequestDto.amount;
    if (amount <= 0) {
      notification.addError('Amount must be greater than zero', null);
    }
    return notification;
  }
}
