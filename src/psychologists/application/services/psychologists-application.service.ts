import { Injectable, NotFoundException } from "@nestjs/common";
import { CommandBus } from '@nestjs/cqrs';
import { RegisterPsychologistValidator } from '../validators/register-psychologist.validator';
import { RegisterPsychologistRequestDto } from '../dtos/request/register-psychologist-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { RegisterPsychologistResponseDto } from '../dtos/response/register-psychologist-response.dto';
import { RegisterPsychologistCommand } from '../commands/register-psychologist.command';
import { InjectRepository } from "@nestjs/typeorm";
import { PsychologistTypeORM } from "../../infrastructure/persistence/typeorm/entities/psychologist.typeorm";
import { getConnection, Repository } from "typeorm";
import { Psychologist } from "../../domain/entities/psychologist.entity";
import { EditPsychologistRequestDto } from "../dtos/request/edit-psychologist-request.dto";
import { response } from "express";

@Injectable()
export class PsychologistsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerPsychologistValidator: RegisterPsychologistValidator,
    @InjectRepository(PsychologistTypeORM)
    private readonly psychologistRepository: Repository<Psychologist>
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

  async update(id: number, editPsychologistRequestDto: EditPsychologistRequestDto){
    const psychologist = await this.psychologistRepository.findOne(id);
    if(!psychologist) {
      throw new NotFoundException('Psychologist not found');
    }
    const editedPsychologist = Object.assign(psychologist, editPsychologistRequestDto);
    return await this.psychologistRepository.save(editedPsychologist);
  }

  async remove(id: number) {
    const psychologist = await this.psychologistRepository.findOne(id);
    if(!psychologist){
      throw new NotFoundException('Psychologist doesnt exist');
    }
    return this.psychologistRepository.delete(id);
  }


}
