import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina propiedades que no están definidas en el DTO
    forbidNonWhitelisted: true, // Lanza un error si hay propiedades no definidas en el DTO
    transform: true, // Transforma los payloads a instancias de clase DTO
    transformOptions: {
        enableImplicitConversion: true // Permite la conversión implícita de tipos
    }
  }));
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
