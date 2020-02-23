import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import * as dotenv from "dotenv";
import { ValidationPipe } from "@nestjs/common";
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.useGlobalPipes(new ValidationPipe()).listen(3000);
}
bootstrap();
