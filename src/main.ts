import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
// import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  console.log(`%cApp running on port: ${process.env.API_PORT}`, 'color:green;');
  const app = await NestFactory.create(AppModule);
  // const seeder = app.get(SeederService);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('OpTracker API')
    .setDescription('The OpTracker API Documentation')
    .setVersion('1.0')
    .addTag('Core')
    .addTag('Client')
    .addTag('MedProcedure')
    .addTag('MedTeam')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // await seeder.seedAll();
  await app.listen(process.env.API_PORT || 3000);
}
bootstrap();
