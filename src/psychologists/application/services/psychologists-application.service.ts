import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterPsychologistValidator } from '../validators/register-psychologist.validator';
import { RegisterPsychologistRequestDto } from '../dtos/request/register-psychologist-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { RegisterPsychologistResponseDto } from '../dtos/response/register-psychologist-response.dto';
import { RegisterPsychologistCommand } from '../commands/register-psychologist.command';

@Injectable()
export class PsychologistsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerPsychologistValidator: RegisterPsychologistValidator,
  ) {}

  async register(
    registerPsychologistRequestDto: RegisterPsychologistRequestDto,
  ): Promise<Result<AppNotification, RegisterPsychologistResponseDto>> {
    const notification: AppNotification =
      await this.registerPsychologistValidator.validate(
        registerPsychologistRequestDto,
      );
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registerPsychologistCommand: RegisterPsychologistCommand =
      new RegisterPsychologistCommand(
        registerPsychologistRequestDto.firstName,
        registerPsychologistRequestDto.lastName,
        registerPsychologistRequestDto.dni,
        registerPsychologistRequestDto.email,
        registerPsychologistRequestDto.password,
        registerPsychologistRequestDto.description,
      );

    const psychologistId = await this.commandBus.execute(
      registerPsychologistCommand,
    );
    const registerPsychologistResponseDto: RegisterPsychologistResponseDto =
      new RegisterPsychologistResponseDto(
        psychologistId,
        registerPsychologistRequestDto.firstName,
        registerPsychologistRequestDto.lastName,
        registerPsychologistRequestDto.dni,
        registerPsychologistRequestDto.email,
        registerPsychologistRequestDto.password,
        registerPsychologistRequestDto.description,
      );
    return Result.ok(registerPsychologistResponseDto);
  }
}
