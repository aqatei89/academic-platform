import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StartAssessmentDto, SubmitAnswerDto } from './dto/assessment.dto';

@Injectable()
export class AssessmentService {
    constructor(private prisma: PrismaService) { }

    async startSession(dto: StartAssessmentDto) {
        // Check if user has an active session
        const activeSession = await this.prisma.assessmentSession.findFirst({
            where: { userId: dto.userId, status: 'ACTIVE' },
        });

        if (activeSession) {
            return this.getNextQuestion(activeSession.id);
        }

        // Create new session
        const session = await this.prisma.assessmentSession.create({
            data: {
                userId: dto.userId,
                status: 'ACTIVE',
                currentPhase: 1,
                currentQuestionIndex: 0,
            },
        });

        return this.getNextQuestion(session.id);
    }

    async getNextQuestion(sessionId: string) {
        const session = await this.prisma.assessmentSession.findUnique({
            where: { id: sessionId },
        });

        if (!session) throw new NotFoundException('Session not found');

        if (session.status === 'COMPLETED') {
            return { status: 'COMPLETED', message: 'Assessment finished' };
        }

        // Logic to fetch the next question based on currentPhase and index
        // For MVP, we fetch the next question sequentially from the Question table
        const question = await this.prisma.question.findFirst({
            where: {
                phaseId: session.currentPhase,
                active: true,
            },
            skip: session.currentQuestionIndex,
            orderBy: { id: 'asc' }, // In production, this would be heuristic-based ordering
        });

        if (!question) {
            // End of phase?
            if (session.currentPhase === 1) {
                return { status: 'PHASE_1_COMPLETE', message: 'Phase 1 Complete. Payment required for Phase 2.' };
            }
            return { status: 'COMPLETED', message: 'Assessment finished' };
        }

        return {
            status: 'IN_PROGRESS',
            session,
            question: {
                id: question.id,
                text: question.textAr,
                type: question.inputType,
                category: question.category,
            },
        };
    }

    async submitAnswer(dto: SubmitAnswerDto) {
        const session = await this.prisma.assessmentSession.findUnique({
            where: { id: dto.sessionId },
        });
        if (!session) throw new NotFoundException('Session not found');

        // 1. Record Answer
        await this.prisma.answer.create({
            data: {
                sessionId: session.id,
                questionId: dto.questionId,
                responseValue: JSON.stringify(dto.answer),
                responseTimeMs: 0, // Mock, should be passed from frontend
            },
        });

        // 2. Advance State
        await this.prisma.assessmentSession.update({
            where: { id: session.id },
            data: {
                currentQuestionIndex: session.currentQuestionIndex + 1,
            },
        });

        // 3. Trigger AI Analysis (Mock for now)
        // In production: call logic to analyze answer and update 'confidence_state'

        // 4. Return next question
        return this.getNextQuestion(session.id);
    }
}
