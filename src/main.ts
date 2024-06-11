import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigins = process.env.SERVER.split(',');
  app.enableCors({
    origin: allowedOrigins,
    credentials: true, // sirve para que el navegador permita las cookies
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina los campos que no esten en el DTO
      forbidNonWhitelisted: true, // evita que se envien campos no permitidos
      transform: true, // convierte los tipos de datos a los que se especifican en el DTO
    }),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
