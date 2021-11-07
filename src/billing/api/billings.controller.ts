import { Body, Controller, Post , Res, Get } from "@nestjs/common";
import { BillingsApplicationService } from "../application/services/billings-application.service";
import { QueryBus } from "@nestjs/cqrs";
import { RegisterBillingRequestDto } from "../application/dtos/request/register-billing-request.dto";
import { ApiController } from "../../common/api/api.controller";
import { RegisterBillingResponseDto } from "../application/dtos/response/register-billing-response.dto";
import { AppNotification } from "../../common/application/app.notification";
import { Result } from "typescript-result";
import { GetBillingQuery } from "../application/queries/get-billing.query";

@Controller('billings')
export class BillingsController {
  constructor(
    private readonly billingsApplicationService: BillingsApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async register(
    @Body() registerBillingRequestDto: RegisterBillingRequestDto,
    @Res({passthrough: true}) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterBillingResponseDto> = await this.billingsApplicationService.register(registerBillingRequestDto);
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
}