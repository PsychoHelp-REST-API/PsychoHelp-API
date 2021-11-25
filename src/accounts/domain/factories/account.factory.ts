import { AccountNumber } from "../value-objects/account-number.value";
import { Money } from "../../../common/domain/value-objects/money.value";
import { PsychologistId } from "../../../psychologists/domain/value-objects/psychologist-id.value";
import { Account } from "../entities/account.entity";
import { AccountId } from "../value-objects/account-id.value";

export class AccountFactory{
  public static createFrom(number: AccountNumber, balance: Money, psychologistId: PsychologistId): Account {
    return new Account(number, balance, psychologistId);
  }

  public static withId(accountId: AccountId, number: AccountNumber, balance: Money, psychologistId: PsychologistId): Account{
    let account: Account = new Account(number, balance, psychologistId);
    account.changeId(accountId);
    return account;
  }
}