import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors()

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    })
  )

  const config = new DocumentBuilder()
    .setTitle('OpTracker API')
    .setDescription('The OpTracker API Documentation')
    .setVersion('1.0')
    .addTag("OpTracker")
    .addBearerAuth()
    .build()
  
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup("api", app, documentFactory)

  await app.listen(3000);
}
bootstrap();
