import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OpenPaymentValidator } from '../validators/open-payment.validator';
import { OpenPaymentRequest } from '../dtos/request/open-payment-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { OpenPaymentResponse } from '../dtos/response/open-payment-response.dto';
import { OpenPayment } from '../commands/open-payment.command';

@Injectable()
export class PaymentsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private openPaymentValidator: OpenPaymentValidator,
  ) {}

  async open(
    openPaymentRequestDto: OpenPaymentRequest,
  ): Promise<Result<AppNotification, OpenPaymentResponse>> {
    const notification: AppNotification =
      await this.openPaymentValidator.validate(openPaymentRequestDto);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const openPayment: OpenPayment = new OpenPayment(
      openPaymentRequestDto.psychologistId,
      openPaymentRequestDto.number,
    );
    const paymentId: number = await this.commandBus.execute(openPayment);
    const openPaymentResponse: OpenPaymentResponse = new OpenPaymentResponse(
      paymentId,
      openPayment.number,
      0,
      null,
      1,
      null,
      null,
      openPayment.psychologistId,
    );
    return Result.ok(openPaymentResponse);
  }
}
