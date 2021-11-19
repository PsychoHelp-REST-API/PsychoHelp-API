import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { RegisterPublishingValidator } from "../validators/register-publishing.validator";
import { RegisterPostRequestDto } from "../dtos/request/register-post-request.dto";
import { AppNotification } from "../../../common/application/app.notification";
import { Result } from "typescript-result";
import { RegisterPostResponseDto } from "../dtos/response/register-post-response.dto";
import { RegisterBillingCommand } from "../../../billing/application/commands/register-billing.command";
import { RegisterBillingResponseDto } from "../../../billing/application/dtos/response/register-billing-response.dto";
import { RegisterPostCommand } from "../commands/register-post.command";

@Injectable()
export class PostsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registeredPublishingValidator: RegisterPublishingValidator,
  ) {}

  async register(
    registerPostRequestDto: RegisterPostRequestDto,
  ): Promise<Result<AppNotification, RegisterPostResponseDto>> {
    const notification: AppNotification = await this.registeredPublishingValidator.validate(
      registerPostRequestDto,
    );
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registerPostCommand: RegisterPostCommand = new RegisterPostCommand(
      // TODO: implementar nombre del psicologo
      registerPostRequestDto.title,
      registerPostRequestDto.description,
      registerPostRequestDto.image,
      registerPostRequestDto.dateTime,
    );
    const publishingId = await this.commandBus.execute(registerPostCommand);
    const registerPostResponseDto : RegisterPostResponseDto = new RegisterPostResponseDto(
      publishingId,
      // TODO: implementar nombre del paciente
      registerPostRequestDto.title,
      registerPostRequestDto.description,
      registerPostRequestDto.image,
      registerPostRequestDto.dateTime,
    );
    return Result.ok(registerPostResponseDto);
  }
}