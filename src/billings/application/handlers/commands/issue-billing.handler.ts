import { IssueBillingCommand } from "../../commands/issue-billing.command";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { BillingTypeORM } from "../../../infrastructure/persistence/typeorm/entities/billing.typeorm";
import { Repository } from "typeorm";
import { Result } from "typescript-result";
import { AppNotification } from "../../../../common/application/app.notification";
import { BillingCode } from "../../../domain/value-objects/billing-code.value";
import { Description } from "../../../domain/value-objects/description.value";
import { BillingMapper } from "../../mappers/billing.mapper";
import { Billing } from "../../../domain/entities/billing.entity";
import { BillingFactory } from "../../../domain/factories/billing.factory";
import { BillingId } from "../../../domain/value-objects/billing-id.value";
import { BillingDate } from "../../../domain/value-objects/billing-date.value";
import { Money } from "../../../domain/value-objects/money.value";
import { PatientId } from "../../../../patients/domain/value-objects/patient-id.value";
import { PatientTypeORM } from "../../../../patients/infrastructure/persistence/typeorm/entities/patient.typeorm";

@CommandHandler(IssueBillingCommand)
export class IssueBillingHandler
  implements ICommandHandler<IssueBillingCommand> {
  constructor(
    @InjectRepository(BillingTypeORM)
    private billingRepository: Repository<BillingTypeORM>,
    @InjectRepository(PatientTypeORM)
    private patientRepository: Repository<PatientTypeORM>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: IssueBillingCommand) {
    let billId: number = 0;

    const codeResult: Result<AppNotification, BillingCode> = BillingCode.createCode(command.code);
    if (codeResult.isFailure()) return billId;

    const patientIdResult: number = command.patientId;
    const patientTypeORM: PatientTypeORM = await this.patientRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .useTransaction(true)
      .where("id= :id")
      .setParameter("id", patientIdResult)
      .getOne();
    if(patientTypeORM == null) return billId;

    const patientId: PatientId = PatientId.of(patientTypeORM.id);

    const amountResult:Result<AppNotification, Money> = Money.create(command.amount);
    if (amountResult.isFailure()) return billId;

    const descriptionResult: Result<AppNotification, Description> = Description.create(command.description);
    if (descriptionResult.isFailure()) return billId;

    const dateResult: Result<AppNotification, BillingDate> = BillingDate.create(command.date);
    if (dateResult.isFailure()) return billId;

    let billing: Billing = BillingFactory.createFrom(patientId, codeResult.value, amountResult.value,
      descriptionResult.value, dateResult.value);
    let billingTypeORM: BillingTypeORM = BillingMapper.toTypeORM(billing);
    billingTypeORM = await this.billingRepository.save(billingTypeORM);
    if (billingTypeORM == null) return billId;

    billId = Number(billingTypeORM.id);
    billing.changeId(BillingId.createBillId(billId));
    console.log(billId);
    billing = this.publisher.mergeObjectContext(billing);
    billing.issue();
    billing.commit();
    return billId;
  }
}