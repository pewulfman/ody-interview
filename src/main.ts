import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { E_TOO_MANY_REQUESTS } from './common/errors';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APP_DESCRIPTION, APP_NAME, APP_VERSION } from './common/constants';
import yaml from 'yaml';
import { writeFileSync } from 'fs';

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

  // - Swagger setup
  const config = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(APP_DESCRIPTION)
    .setVersion(APP_VERSION)
    .addBearerAuth() // The API use Bearer Authentication
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // -- Write the OpenAPI spec to a file
  const yamlString: string = yaml.stringify(document, {});
  writeFileSync('./open-api-spec.yaml', yamlString);
  // -- Swagger UI is available at /docs
  SwaggerModule.setup('docs', app, document);

  // - Start app
  await app.listen(parseInt(process.env.PORT!)); // existence is verified by Joi in AppModule
}
bootstrap();
