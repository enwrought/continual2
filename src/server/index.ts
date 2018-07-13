import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { createConnection } from 'typeorm';
import { ApplicationModule } from './ApplicationModule';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  const options = new DocumentBuilder()
  .setTitle('Users API')
  .setDescription('Create users and entries.')
  .setVersion('0.0.1')
  .addTag('diary')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  await app.listen(port);
  console.log(`Started server on port ${port}.`);
}
bootstrap();
