import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enterprise-Grade Validation
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));

    // CORS for Client
    app.enableCors({
        origin: 'http://localhost:3000', // Next.js
        credentials: true,
    });

    // Swagger Documentation
    const config = new DocumentBuilder()
        .setTitle('Academic Guidance Platform API')
        .setDescription('The core decision engine API')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(3001);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
