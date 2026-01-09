import { Body, Controller, Post, Get, Query } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { StartAssessmentDto, SubmitAnswerDto } from './dto/assessment.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Assessment')
@Controller('assessment')
export class AssessmentController {
    constructor(private readonly assessmentService: AssessmentService) { }

    @Post('start')
    @ApiOperation({ summary: 'Start a new assessment session' })
    start(@Body() dto: StartAssessmentDto) {
        return this.assessmentService.startSession(dto);
    }

    @Get('question')
    @ApiOperation({ summary: 'Get current question' })
    getQuestion(@Query('sessionId') sessionId: string) {
        return this.assessmentService.getNextQuestion(sessionId);
    }

    @Post('answer')
    @ApiOperation({ summary: 'Submit answer and get next step' })
    submitAnswer(@Body() dto: SubmitAnswerDto) {
        return this.assessmentService.submitAnswer(dto);
    }
}
