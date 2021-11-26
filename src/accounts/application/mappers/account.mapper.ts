import { Account } from "../../domain/entities/account.entity";
import { AccountTypeORM } from "../../infrastructure/persistence/typeorm/entities/account.typeorm";
import { AccountNumberTypeORM } from "../../infrastructure/persistence/typeorm/value-objects/account-number.typeorm";
import { BalanceTypeORM } from "../../infrastructure/persistence/typeorm/value-objects/balance.typeorm";
import { PsychologistIdTypeORM } from "../../infrastructure/persistence/typeorm/value-objects/psychologist-id.typeorm";

export class AccountMapper {
  public static toTypeORM(account: Account): AccountTypeORM {
    const accountTypeORM: AccountTypeORM = new AccountTypeORM();
    accountTypeORM.id = account.getId() != null ? account.getId().getValue() : 0;
    accountTypeORM.number = account.getNumber() != null ? AccountNumberTypeORM.from(account.getNumber().getValue()) : null;
    accountTypeORM.balance = account.getBalance() != null ? BalanceTypeORM.from(account.getBalance().getAmount(), account.getBalance().getCurrency()) : null;
    accountTypeORM.psychologistId = account.getPsychologistId() != null ? PsychologistIdTypeORM.from(account.getPsychologistId().getValue()) : null;
    return accountTypeORM;
  }
}