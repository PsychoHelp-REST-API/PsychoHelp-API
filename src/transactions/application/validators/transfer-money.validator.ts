import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentTypeORM } from "../../../payment/infrastructure/persistence/typeorm/entities/payment.typeorm";
import { Repository } from "typeorm";
import { TransferRequestDto } from "../dtos/request/transfer-request.dto";
import { AppNotification } from "../../../common/application/app.notification";

@Injectable()
export class TransferMoneyValidator {
  constructor(@InjectRepository(PaymentTypeORM) private paymentRepository: Repository<PaymentTypeORM>) {}

  public async validate(transferRequestDto: TransferRequestDto): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const fromPaymentNumber: string = transferRequestDto.fromPaymentNumber.trim();
    if (fromPaymentNumber.length <= 0) {
      notification.addError('From payment number is required', null);
    }
    const toPaymentNumber: string = transferRequestDto.toPaymentNumber.trim();
    if (toPaymentNumber.length <= 0) {
      notification.addError('To payment number is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const fromPaymentTypeORM: PaymentTypeORM = await this.paymentRepository.createQueryBuilder()
      .where("number = :number")
      .setParameter("number", fromPaymentNumber)
      .getOne();
    if (fromPaymentTypeORM == null) {
      notification.addError('From payment number not found', null);
    }
    const toPaymentTypeORM: PaymentTypeORM = await this.paymentRepository.createQueryBuilder()
      .where("number = :number")
      .setParameter("number", toPaymentNumber)
      .getOne();
    if (toPaymentTypeORM == null) {
      notification.addError('To payment number not found', null);
    }
    const amount: number = transferRequestDto.amount;
    if (amount <= 0) {
      notification.addError('Amount must be greater than zero', null);
    }
    return notification;
  }
}
