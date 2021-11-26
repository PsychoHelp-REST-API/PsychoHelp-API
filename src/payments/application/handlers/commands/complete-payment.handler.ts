import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CompletePayment } from "../../commands/complete-payment.command";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentTypeORM } from "../../../infrastructure/persistence/typeorm/entities/payment.typeorm";
import { Repository } from "typeorm";
import { PaymentStatus } from "../../../domain/enums/payment-status.enum";

@CommandHandler(CompletePayment)
export class CompletePaymentHandler
  implements ICommandHandler<CompletePayment>{
  constructor(
    @InjectRepository(PaymentTypeORM)
    private paymentRepository: Repository<PaymentTypeORM>
  ) {
  }

  async execute(command:CompletePayment){
    const paymentId: number = command.paymentId;
    let paymentTypeORM: PaymentTypeORM = await this.paymentRepository
      .createQueryBuilder()
      .where("id = :id")
      .setParameter("id", paymentId)
      .getOne();

    if(paymentTypeORM == null){
      return false;
    }

    paymentTypeORM.status = PaymentStatus.COMPLETED;
    paymentTypeORM = await this.paymentRepository.save(paymentTypeORM);
    if(paymentTypeORM == null){
      return false;
    }
    return true;
  }
}