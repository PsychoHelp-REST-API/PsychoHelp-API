import { Injectable } from "@nestjs/common";
import { PaymentTypeORM } from "../../../payment/infrastructure/persistence/typeorm/entities/payment.typeorm";
import { Repository } from "typeorm";
import { DepositRequestDto } from "../dtos/request/deposit-request.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { AppNotification } from "../../../common/application/app.notification";

@Injectable()
export class DepositMoneyValidator {
  constructor(@InjectRepository(PaymentTypeORM) private paymentRepository: Repository<PaymentTypeORM>) {}

  public async validate(depositRequestDto: DepositRequestDto): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const paymentNumber: string = depositRequestDto.paymentNumber.trim();
    if (paymentNumber.length <= 0) {
      notification.addError('Account number is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const paymentTypeORM: PaymentTypeORM = await this.paymentRepository.createQueryBuilder()
      .where("number = :number")
      .setParameter("number", paymentNumber)
      .getOne();
    if (paymentTypeORM == null) {
      notification.addError('Payment number not found', null);
    }
    const amount: number = depositRequestDto.amount;
    if (amount <= 0) {
      notification.addError('Amount must be greater than zero', null);
    }
    return notification;
  }
}