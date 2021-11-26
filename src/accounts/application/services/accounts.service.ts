import { Injectable } from '@nestjs/common';
import { CommandBus } from "@nestjs/cqrs";
import { OpenAccountValidator } from "../validators/open-account.validator";
import { OpenAccountRequest } from "../dtos/request/open-account-request.dto";
import { AppNotification } from "../../../common/application/app.notification";
import { Result } from "typescript-result";
import { OpenAccount } from "../commands/open-account.command";
import { OpenAccountResponse } from "../dtos/response/open-account-response.dto";

@Injectable()
export class AccountsService {
  constructor(
    private commandBus: CommandBus,
    private openAccountValidator: OpenAccountValidator
  ) {}

  async open(openAccountRequestDto: OpenAccountRequest): Promise<Result<AppNotification, OpenAccountResponse>>{
    const notification: AppNotification = await this.openAccountValidator.validate(openAccountRequestDto);
    if (notification.hasErrors()){
      return Result.error(notification);
    }

    const openAccount: OpenAccount = new OpenAccount(
      openAccountRequestDto.psychologistId,
      openAccountRequestDto.number
    );

    const accountId: number = await this.commandBus.execute(openAccount);

    const openAccountResponse: OpenAccountResponse = new OpenAccountResponse(
      accountId,
      openAccount.number,
      0,
      openAccount.psychologistId
    );
    return Result.ok(openAccountResponse);
  }
}
