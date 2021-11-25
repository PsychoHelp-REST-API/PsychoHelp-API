import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BillingTypeORM } from "../../infrastructure/persistence/typeorm/entities/billing.typeorm";
import { Repository } from "typeorm";
import { IssueBillingRequestDto } from "../dtos/request/issue-billing-request.dto";
import { AppNotification } from "../../../common/application/app.notification";
import { PatientTypeORM } from "../../../patients/infrastructure/persistence/typeorm/entities/patient.typeorm";

@Injectable()
export class IssueBillingValidator {
  constructor(
    @InjectRepository(BillingTypeORM) private billingRepository: Repository<BillingTypeORM>,
    @InjectRepository(PatientTypeORM) private patientRepository: Repository<PatientTypeORM>) {}

  public async validate(issueBillingRequestDto: IssueBillingRequestDto): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();

    const patientId: number = issueBillingRequestDto.patientId;
    if (patientId <= 0) {
      notification.addError('Patient Id is required', null);
    }

    const code: string = issueBillingRequestDto.code.trim();
    if (code.length <= 0) {
      notification.addError('Bill code is required', null);
    }
    else if (code.length >= 9 || code.length < 8) {
      notification.addError('Bill code must be 8 digits', null);
    }

    const amount: number = issueBillingRequestDto.amount;
    if (amount <= 0) {
      notification.addError('Bill amount must be greater than 0', null);
    }

    const description: string = issueBillingRequestDto.description.trim();
    if (description.length <= 0) {
      notification.addError('Bill description is required', null);
    }

    const date: string = issueBillingRequestDto.date.trim();
    if (date.length <= 0) {
      notification.addError('Bill date is required', null);
    }

    if (notification.hasErrors()) {
      return notification
    }

    const patientTypeORM: PatientTypeORM = await this.patientRepository.createQueryBuilder()
      .where("id= :id")
      .setParameter("id", patientId)
      .getOne();
    if (patientTypeORM == null) {
      notification.addError('Patient Id not found', null);
    }

    const billingTypeORM: BillingTypeORM = await this.billingRepository.createQueryBuilder()
      .where("code = :code", {code}).getOne();
    if (billingTypeORM != null) {
      notification.addError('Bill code is taken', null);
    }
    return notification;
  }
}