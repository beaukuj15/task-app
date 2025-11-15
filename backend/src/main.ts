import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


import "dotenv/config";
import { ValidationPipe } from "@nestjs/common";


async function bootstrap() {
  console.log("got boostrap env: " + process.env.JWT_SECRET);
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://your-frontend-domain.com', 'http://localhost:4200'], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true, 
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  await app.listen(process.env.PORT ?? 3000);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));



}
bootstrap();
