import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { BillingsService } from '../application/services/billings.service';
import { QueryBus } from "@nestjs/cqrs";
import { IssueBillingRequestDto } from "../application/dtos/request/issue-billing-request.dto";
import { Result } from "typescript-result";
import { AppNotification } from "../../common/application/app.notification";
import { IssueBillingResponseDto } from "../application/dtos/response/issue-billing-response.dto";
import { ApiController } from "../../common/api/api.controller";
import { GetBillingQuery } from "../application/queries/get-billing.query";
import { GetBillingByIdQuery } from "../application/queries/get-billing-by-id.query";

@Controller('billings')
export class BillingsController {
  constructor(
    private readonly billingsService: BillingsService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async issue(
    @Body() issueBillingRequestDto: IssueBillingRequestDto,
    @Res({passthrough: true}) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, IssueBillingResponseDto> =
        await this.billingsService.issue(issueBillingRequestDto);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getBillings(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const billings = await this.queryBus.execute(new GetBillingQuery());
      return ApiController.ok(response, billings);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  async getById(@Param('id') billingId: number, @Res({passthrough: true}) response):
  Promise<object> {
    try {
      const billings = await this.queryBus.execute(new GetBillingByIdQuery(billingId));
      return ApiController.ok(response, billings);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}