import { IsEmail, IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RequestOtpDto {
    @ApiProperty({ example: 'ahmad@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '+966500000000' })
    @IsString()
    @IsNotEmpty()
    mobile: string;
}

export class VerifyOtpDto {
    @ApiProperty({ example: 'ahmad@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: '123456' })
    @IsString()
    @IsNotEmpty()
    otp: string;
}

export class RegisterUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    mobile: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    country: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    schoolName?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    academicStage?: string;
}
