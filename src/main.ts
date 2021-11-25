import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('PsychoHelp')
    .setDescription('The PsychoHelp API description')
    .setVersion('1.0')
    .addTag('Psychologist')
    .addTag('Patient')
    .addTag('Logbook')
    .addTag('Appointment')
    .addTag('Logbook for patient')
    .addTag('Billing')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}
bootstrap();
