import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function start() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle("UZ-INVEST")
    .setVersion("v-01")
    .addBearerAuth()
    .build();


  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  await app.listen(process.env.PORT ?? 3001, () => {
    console.log("\n\n + ====================================================================== +");
    console.log(`| |                                                                      | | `);
    console.log(`| | 🚀             Server started at: http://localhost:${process.env.PORT}           🚀 | | `);
    console.log(`| |                                                                      | | `);
    console.log(`| | 📚  Swagger API documentation at: http://localhost:${process.env.PORT}/api/docs  📚 | |`);
    console.log(`| |                                                                      | | `);
    console.log(" + ====================================================================== +");
  });

}
start();
