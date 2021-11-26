import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAccountsQuery } from "../../queries/get-accounts.query";
import { getManager } from "typeorm";
import { GetAccountsDto } from "../../dtos/queries/get-accounts.dto";

@QueryHandler(GetAccountsQuery)
export class GetAccountsHandler implements IQueryHandler<GetAccountsQuery>{
  constructor() {
  }

  async execute(query: GetAccountsQuery){
    const manager = getManager();
    const sql = `
    SELECT
    id,
    number,
    balance,
    psychologist_id
    FROM
    accounts
    ORDER BY
    id;`;
    const ormAccounts = await manager.query(sql);
    if(ormAccounts.length <= 0){
      return [];
    }

    const accounts: GetAccountsDto[] = ormAccounts.map(function(ormAccount) {
      let accountDto = new GetAccountsDto();
      accountDto.id = Number(ormAccount.id);
      accountDto.number = ormAccount.number;
      accountDto.balance = Number(ormAccount.balance);
      accountDto.psychologistId = Number(ormAccount.psychologist_id);
      return accountDto;
    });

    return accounts;
  }
}