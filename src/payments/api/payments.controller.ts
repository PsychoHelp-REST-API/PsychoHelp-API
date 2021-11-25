import { Body, Controller, Post, Res } from "@nestjs/common";
import { PaymentsService } from '../application/services/payments.service';
import { QueryBus } from "@nestjs/cqrs";
import { DepositRequestDto } from "../application/dtos/request/deposit-request.dto";
import { AppNotification } from "../../common/application/app.notification";
import { DepositResponseDto } from "../application/dtos/response/deposit-response.dto";
import { Result } from "typescript-result";
import { ApiController } from "../../common/api/api.controller";

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService,
              private readonly queryBus: QueryBus) {}

  @Post()
  async deposit(
    @Body() depositRequestDto: DepositRequestDto,
    @Res({passthrough: true}) response
  ): Promise<object>{
    try{
      const result: Result<AppNotification, DepositResponseDto> = await this.paymentsService.deposit(depositRequestDto);
      if(result.isSuccess()){
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error){
      return ApiController.serverError(response, error);
    }
  }


}
