import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { E_TOO_MANY_REQUESTS } from './common/errors';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // - NestJS app setup
  const app = await NestFactory.create(AppModule);

  // - Basic security setup
  // -- Helmet setup (https://helmetjs.github.io/)
  app.use(helmet());

  // -- Cors setup
  app.enableCors({
    origin: false,
  });

  // -- Rate limiting: Limits the number of requests from the same IP in a period of time.
  app.use(
    rateLimit({
      windowMs: 10 * 60 * 1000, // in milliseconds
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
      skipSuccessfulRequests: false,
      message: { message: E_TOO_MANY_REQUESTS, statusCode: 403 },
    }),
  );

  // - Data validation setup
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // - Start app
  await app.listen(parseInt(process.env.PORT!)); // existence is verified by Joi in AppModule
}
bootstrap();
