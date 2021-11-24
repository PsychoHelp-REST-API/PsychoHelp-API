import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CompleteTransaction } from '../../commands/complete-transaction.command';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionTypeORM } from '../../../infrastructure/persistence/typeorm/entities/transaction.typeorm';
import { Repository } from 'typeorm';
import { TransactionStatus } from '../../../domain/enums/transaction.status.enum';

@CommandHandler(CompleteTransaction)
export class CompleteTransactionHandler
  implements ICommandHandler<CompleteTransaction>
{
  constructor(
    @InjectRepository(TransactionTypeORM)
    private transactionRepository: Repository<TransactionTypeORM>,
  ) {}

  async execute(command: CompleteTransaction) {
    const transactionId: number = command.transactionId;
    let transactionTypeORM: TransactionTypeORM =
      await this.transactionRepository
        .createQueryBuilder()
        .where('id = :id')
        .setParameter('id', transactionId)
        .getOne();
    if (transactionTypeORM == null) {
      return false;
    }
    transactionTypeORM.status = TransactionStatus.COMPLETED;
    transactionTypeORM = await this.transactionRepository.save(
      transactionTypeORM,
    );
    if (transactionTypeORM == null) {
      return false;
    }
    return true;
  }
}
