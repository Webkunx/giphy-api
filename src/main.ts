import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import * as dotenv from "dotenv";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerOptions = new DocumentBuilder()
    .setTitle("Giphy API")
    .setDescription("My small api for GIPHY interactions")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup("api", app, document);
  await app.useGlobalPipes(new ValidationPipe()).listen(3000);
}
bootstrap();
