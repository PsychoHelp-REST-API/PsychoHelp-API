import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BillingTypeORM } from "../../infraestructure/persistence/typeorm/entities/billing.typeorm";
import { Repository } from "typeorm";
import { RegisterBillingRequestDto } from "../dtos/request/register-billing-request.dto";
import { AppNotification } from "../../../common/application/app.notification";

@Injectable()
export class RegisterBillingValidator {
  constructor(
    @InjectRepository(BillingTypeORM)
    private billingRepository: Repository<BillingTypeORM>,
  ) {}

  public async validate(
    registerBillingRequestDto: RegisterBillingRequestDto,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    // TODO: implementar nombre del paciente
    const code: string = registerBillingRequestDto.code.trim();
    if (code.length <= 0) {
      notification.addError('Billing code is required', null);
    }
    if (notification.hasErrors()) {
      return notification
    }
    const billing: BillingTypeORM = await this.billingRepository.createQueryBuilder().where("code = :code", {code}).getOne();
    if (billing != null) {
      notification.addError('Billing code is taken', null);
    }
    return notification;
  }
}