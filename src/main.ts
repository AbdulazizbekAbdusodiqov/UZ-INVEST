import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConsoleLogger, ValidationPipe } from "@nestjs/common";
import * as cookieParser from 'cookie-parser';
import { WinstonModule } from "nest-winston";
import { winstonConfig } from "./logger/winston-logger";
import { AllExceptionsFilter } from "./logger/error.handling";

async function start() {
  try {
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule, {
      logger: WinstonModule.createLogger(winstonConfig)
    });
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new AllExceptionsFilter())
    app.enableCors({
      origin: "*",
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
      credentials:true //cookie va header
    });
    const config = new DocumentBuilder()
    .setTitle("UZ-INVEST.uz")
    // .setDescription("maqtash shart emas bilaman zo'r chiqan")
    .setVersion("v-01")
    .addBearerAuth(
      {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "JWT",
        description: "Enter JWT token",
        in: "header",
      },
      "uz-invest"
    )
    
    .build()
    app.setGlobalPrefix("api")
    
    const document = SwaggerModule.createDocument(app, config);
    
    SwaggerModule.setup("api/docs", app, document, {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    });
    
    await app.listen(PORT, () => {
      console.log("\n\n + ====================================================================== +");
      console.log(`| |                                                                      | | `);
      console.log(`| | 🚀          Server started at: http://localhost:${PORT}/api          🚀 | | `);
      console.log(`| |                                                                      | | `);
      console.log(`| | 📚  Swagger API documentation at: http://localhost:${PORT}/api/docs  📚 | |`);
      console.log(`| |                                                                      | | `);
      console.log(" + ====================================================================== +");
    });
  } catch (error) {
    console.error("❌ Error starting server:", error);
  }
}

start();
