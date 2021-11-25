import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { DepositMoneyValidator } from "../validators/deposit-money.validator";
import { DepositRequestDto } from "../dtos/request/deposit-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";
import { DepositResponseDto } from "../dtos/response/deposit-response.dto";
import { DepositMoney } from "../commands/deposit-money.command";
import { PaymentStatus, PaymentStatusLabel } from "../../domain/enums/payment-status.enum";
import { DateTime } from "../../../common/domain/value-objects/date-time.value";

@Injectable()
export class PaymentsService {
  constructor(
    private commandBus: CommandBus,
    private depositValidator: DepositMoneyValidator
  ) {
  }

  async deposit(depositRequestDto: DepositRequestDto): Promise<Result<AppNotification, DepositResponseDto>>{
    const notification: AppNotification = await this.depositValidator.validate(depositRequestDto);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const depositMoney: DepositMoney = new DepositMoney(
      depositRequestDto.accountNumber,
      depositRequestDto.amount,
      PaymentStatus.STARTED,
      DateTime.utcNow()
    );

    const paymentId: number = await this.commandBus.execute(depositMoney);
    const depositResponseDto: DepositResponseDto = new DepositResponseDto(
      paymentId,
      depositRequestDto.accountNumber,
      depositRequestDto.amount,
      PaymentStatusLabel.get(PaymentStatus.STARTED),
      null
    );
    return Result.ok(depositResponseDto);
  }
}
