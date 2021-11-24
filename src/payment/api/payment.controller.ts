import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { PaymentService } from '../payment.service';
import { PaymentsApplicationService } from '../application/services/payments-application.service';
import { QueryBus } from '@nestjs/cqrs';
import { OpenPaymentRequest } from '../application/dtos/request/open-payment-request.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../common/application/app.notification';
import { OpenPaymentResponse } from '../application/dtos/response/open-payment-response.dto';
import { ApiController } from '../../common/api/api.controller';
import { GetPaymentsQuery } from '../application/queries/get-payments.query';
import { GetPaymentByIdQuery } from '../application/queries/get-payment-by-id.query';

@Controller('payments')
export class PaymentController {
  constructor(
    private readonly paymentsApplicationService: PaymentsApplicationService,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async open(
    @Body() openPaymentRequest: OpenPaymentRequest,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const result: Result<AppNotification, OpenPaymentResponse> =
        await this.paymentsApplicationService.open(openPaymentRequest);
      if (result.isSuccess()) {
        return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getPayments(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const psychologists = await this.queryBus.execute(new GetPaymentsQuery());
      return ApiController.ok(response, psychologists);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/:id')
  async getById(
    @Param('id') paymentId: number,
    @Res({ passthrough: true }) response,
  ): Promise<object> {
    try {
      const psychologists = await this.queryBus.execute(
        new GetPaymentByIdQuery(paymentId),
      );
      return ApiController.ok(response, psychologists);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}
