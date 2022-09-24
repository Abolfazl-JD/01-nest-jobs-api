import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys : ['adsmcldA48d96a67gGdaM[aq4$8s~pm']
  }))
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
