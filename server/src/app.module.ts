import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AssessmentModule } from './assessment/assessment.module';
import { PaymentModule } from './payment/payment.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
        AuthModule,
        AssessmentModule,
        PaymentModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule { }
