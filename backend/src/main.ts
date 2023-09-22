import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: "http://localhost:8000",
    credentials: true,
  });

  app.use(cookieParser());
  console.log("SERVER IS RUNNING ON PORT 3000  🚀 ");
  await app.listen(3000);
}
bootstrap();
