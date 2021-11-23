import { Injectable } from '@nestjs/common';
import { CommandBus } from "@nestjs/cqrs";
import { IssueBillingValidator } from "../validators/issue-billing.validator";
import { IssueBillingRequestDto } from "../dtos/request/issue-billing-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";
import { IssueBillingResponseDto } from "../dtos/response/issue-billing-response.dto";
import { IssueBillingCommand } from "../commands/issue-billing.command";

@Injectable()
export class BillingsService {
  constructor(
    private commandBus: CommandBus,
    private issueBillingValidator: IssueBillingValidator,
  ) {}

  async issue(
    issueBillingRequestDto: IssueBillingRequestDto,
  ): Promise<Result<AppNotification, IssueBillingResponseDto>> {
    const notification: AppNotification = await this.issueBillingValidator.validate(
      issueBillingRequestDto,
    );
    if (notification.hasErrors()) {
      return Result.error(notification);
    }

    const issueBillingCommand: IssueBillingCommand = new IssueBillingCommand(
      issueBillingRequestDto.patientId,
      issueBillingRequestDto.code,
      issueBillingRequestDto.amount,
      issueBillingRequestDto.description,
      issueBillingRequestDto.date
    );

    const billingId: number = await this.commandBus.execute(issueBillingCommand);

    const issueBillingResponseDto : IssueBillingResponseDto = new IssueBillingResponseDto(
      billingId,
      issueBillingRequestDto.patientId,
      issueBillingRequestDto.code,
      issueBillingRequestDto.amount,
      issueBillingRequestDto.description,
      issueBillingRequestDto.date
    );
    return Result.ok(issueBillingResponseDto);
  }
}
