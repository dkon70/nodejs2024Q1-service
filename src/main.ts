import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import * as YAML from 'yamljs';
import { SwaggerModule } from '@nestjs/swagger';

const yaml = YAML.load('doc/api.yaml');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerModule.setup('doc', app, yaml);
  await app.listen(process.env.PORT);
}
bootstrap();
