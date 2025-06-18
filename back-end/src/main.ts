import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe} from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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
  const config= new DocumentBuilder()
  .setTitle('API de Gestión de Estudiantes')
    .setDescription('Documentación de API para gestionar información de estudiantes')
    .setVersion('1.0')
    .addTag('Estudiantes', 'Operaciones relacionadas con estudiantes')
    .addBasicAuth({ 
      type: 'http',
      scheme: 'basic',
      description: 'Autenticación básica usando nombre de usuario y contraseña',
    }, 'BasicAuth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document); // URL para acceder a la documentación /api-docs
  await app.listen(3000);
}
bootstrap();
