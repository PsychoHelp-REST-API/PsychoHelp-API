import { Injectable, NotFoundException } from "@nestjs/common";
import { CommandBus } from '@nestjs/cqrs';
import { RegisterPatientValidator } from '../validators/register-patient.validator';
import { RegisterPatientRequestDto } from '../dtos/request/register-patient-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../common/application/app.notification';
import { RegisterPatientCommand } from '../commands/register-patient.command';
import { RegisterPatientResponseDto } from '../dtos/response/register-patient-response.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { PatientTypeORM } from "../../infrastructure/persistence/typeorm/entities/patient.typeorm";
import { Repository } from "typeorm";
import { Patient } from "../../domain/entities/patient.entity";

@Injectable()
export class PatientsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerPatientValidator: RegisterPatientValidator,
    @InjectRepository(PatientTypeORM)
    private readonly patientRepository: Repository<Patient>
  ) {}

  async register(
    registerPatientRequestDto: RegisterPatientRequestDto,
  ): Promise<Result<AppNotification, RegisterPatientResponseDto>> {
    const notification: AppNotification =
      await this.registerPatientValidator.validate(registerPatientRequestDto);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registerPatientCommand: RegisterPatientCommand =
      new RegisterPatientCommand(
        registerPatientRequestDto.firstName,
        registerPatientRequestDto.lastName,
        registerPatientRequestDto.dni,
        registerPatientRequestDto.email,
        registerPatientRequestDto.password,
      );

    const patientId = await this.commandBus.execute(registerPatientCommand);

    const registerPatientResponseDto: RegisterPatientResponseDto =
      new RegisterPatientResponseDto(
        patientId,
        registerPatientRequestDto.firstName,
        registerPatientRequestDto.lastName,
        registerPatientRequestDto.dni,
        registerPatientRequestDto.email,
        registerPatientRequestDto.password,
      );
    return Result.ok(registerPatientResponseDto);
  }

  async remove(id: number) {
    const patient = await this.patientRepository.findOne(id);
    if(!patient) {
      throw new NotFoundException('Patient doesnt exist');
    }
    return this.patientRepository.delete(id);
  }
}
