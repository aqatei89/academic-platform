import { Body, Controller, Post, Headers, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Post('checkout')
    @ApiOperation({ summary: 'Create Stripe Checkout Session' })
    createCheckout(@Body() body: { userId: string; phaseName: string }) {
        return this.paymentService.createCheckoutSession(body.userId, body.phaseName);
    }

    @Post('webhook')
    @ApiOperation({ summary: 'Stripe Webhook Handler' })
    handleWebhook(@Headers('stripe-signature') signature: string, @Req() request: any) {
        return this.paymentService.handleWebhook(signature, request.body);
    }
}
