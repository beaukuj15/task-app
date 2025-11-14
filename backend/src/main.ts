import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


import "dotenv/config";
import { ValidationPipe } from "@nestjs/common";




async function bootstrap() {
  console.log("got boostrap env: " + process.env.JWT_SECRET);
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://your-frontend-domain.com', 'http://localhost:4200'], // Specify allowed origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow credentials like cookies or authentication headers
    allowedHeaders: 'Content-Type, Accept, Authorization', // Allowed request headers
  });
  
  await app.listen(process.env.PORT ?? 3000);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));



}
bootstrap();
