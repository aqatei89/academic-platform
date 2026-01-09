import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestOtpDto, VerifyOtpDto, RegisterUserDto } from './dto/auth.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('request-otp')
    @ApiOperation({ summary: 'Request Login OTP' })
    requestOtp(@Body() dto: RequestOtpDto) {
        return this.authService.requestOtp(dto);
    }

    @Post('verify-otp')
    @ApiOperation({ summary: 'Verify OTP and Login' })
    verifyOtp(@Body() dto: VerifyOtpDto) {
        return this.authService.verifyOtp(dto);
    }

    @Post('register')
    @ApiOperation({ summary: 'Complete Registration' })
    register(@Body() dto: RegisterUserDto) {
        return this.authService.register(dto);
    }
}
