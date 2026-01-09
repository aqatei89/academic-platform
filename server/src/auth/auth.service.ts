import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RequestOtpDto, VerifyOtpDto, RegisterUserDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async requestOtp(dto: RequestOtpDto) {
        // In production, integrate with SendGrid or SMS provider.
        // For MVP/Demo, we log the OTP or fix it to '123456'.
        console.log(`[AUTH] OTP for ${dto.email} is 123456`);
        return { message: 'OTP sent successfully' };
    }

    async verifyOtp(dto: VerifyOtpDto) {
        // Mock verification
        if (dto.otp !== '123456') {
            throw new UnauthorizedException('Invalid OTP');
        }

        // Check if user exists
        let user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (!user) {
            return { isNewUser: true, email: dto.email };
        }

        // Generate JWT (Mock for now, would use JwtService)
        const token = `mock_jwt_token_${user.id}`;
        return { token, user };
    }

    async register(dto: RegisterUserDto) {
        const user = await this.prisma.user.create({
            data: {
                fullName: dto.fullName,
                email: dto.email,
                mobile: dto.mobile,
                country: dto.country,
                schoolName: dto.schoolName,
                academicStage: dto.academicStage,
            },
        });

        const token = `mock_jwt_token_${user.id}`;
        return { token, user };
    }
}
