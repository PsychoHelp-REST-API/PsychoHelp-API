import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { RegisterBillingValidator } from "../validators/register-billing.validator";
import { RegisterBillingRequestDto } from "../dtos/request/register-billing-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../../common/application/app.notification";
import { RegisterBillingResponseDto } from "../dtos/response/register-billing-response.dto";
import { RegisterBillingCommand } from "../commands/register-billing.command";

@Injectable()
export class BillingsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registeredBillingValidator: RegisterBillingValidator,
  ) {}

  async register(
    registerBillingRequestDto: RegisterBillingRequestDto,
  ): Promise<Result<AppNotification, RegisterBillingResponseDto>> {
    const notification: AppNotification = await this.registeredBillingValidator.validate(
      registerBillingRequestDto,
    );
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registerBillingCommand: RegisterBillingCommand = new RegisterBillingCommand(
      // TODO: implementar nombre del paciente
      registerBillingRequestDto.code,
      registerBillingRequestDto.description,
      registerBillingRequestDto.amount,
      registerBillingRequestDto.dateTime,
    );
    const billingId = await this.commandBus.execute(registerBillingCommand);
    const registerBillingResponseDto : RegisterBillingResponseDto = new RegisterBillingResponseDto(
      billingId,
      // TODO: implementar nombre del paciente
      registerBillingRequestDto.code,
      registerBillingRequestDto.description,
      registerBillingRequestDto.amount,
      registerBillingRequestDto.dateTime,
    );
    return Result.ok(registerBillingResponseDto);
  }
}