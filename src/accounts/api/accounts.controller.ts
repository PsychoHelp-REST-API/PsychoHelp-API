import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { AccountsService } from '../application/services/accounts.service';
import { QueryBus } from "@nestjs/cqrs";
import { OpenAccountRequest } from "../application/dtos/request/open-account-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../common/application/app.notification";
import { OpenAccountResponse } from "../application/dtos/response/open-account-response.dto";
import { ApiController } from "../../common/api/api.controller";
import { GetAccountsQuery } from "../application/queries/get-accounts.query";

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly queryBus: QueryBus) {}

  @Post()
  async open(
    @Body() openAccountRequest: OpenAccountRequest,
    @Res({passthrough: true}) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, OpenAccountResponse> = await this.accountsService.open(openAccountRequest);
      if(result.isSuccess()){
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error){
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getAccounts(
    @Res({passthrough: true}) response
  ): Promise<object> {
    try{
      const psychologists = await this.queryBus.execute(new GetAccountsQuery());
      return ApiController.ok(response, psychologists);
    } catch (error){
      return ApiController.serverError(response, error);
    }
  }
}
