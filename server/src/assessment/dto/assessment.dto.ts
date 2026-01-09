import { IsString, IsNotEmpty, IsOptional, IsInt, IsUUID, IsJSON } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StartAssessmentDto {
    @ApiProperty({ example: 'user-uuid-123' })
    @IsUUID()
    @IsNotEmpty()
    userId: string;
}

export class SubmitAnswerDto {
    @ApiProperty({ example: 'session-uuid-123' })
    @IsUUID()
    @IsNotEmpty()
    sessionId: string;

    @ApiProperty({ example: 'question-uuid-456' })
    @IsUUID()
    @IsNotEmpty()
    questionId: string;

    @ApiProperty({ example: 'Independent Work' })
    @IsNotEmpty()
    answer: any; // Can be string, number, or JSON object
}
