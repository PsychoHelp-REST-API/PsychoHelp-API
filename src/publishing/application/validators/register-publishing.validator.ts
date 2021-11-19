import { InjectRepository } from "@nestjs/typeorm";
import { PublishingTypeORM } from "../../infraestructure/persistence/typeorm/entities/publishing.typeorm";
import { Repository } from "typeorm";
import { RegisterPostRequestDto } from "../dtos/request/register-post-request.dto";
import { AppNotification } from "../../../common/application/app.notification";
import { BillingTypeORM } from "../../../billing/infraestructure/persistence/typeorm/entities/billing.typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RegisterPublishingValidator {
  constructor(
    @InjectRepository(PublishingTypeORM)
    private publishingRepository: Repository<PublishingTypeORM>,
  ) {}

  public async validate(
    registerPostRequestDto: RegisterPostRequestDto,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    //TODO: implementar nombre del psicologo
    const title: string = registerPostRequestDto.title.trim();
    if (title.length <= 0) {
      notification.addError('Publishing title is required', null);
    }
    if (notification.hasErrors()) {
      return notification
    }
    const publishing: PublishingTypeORM = await this.publishingRepository.createQueryBuilder().where("title = :title", {title}).getOne();
    if (publishing != null) {
      notification.addError('Publishing title is taken', null);
    }
    return notification;
  }
}