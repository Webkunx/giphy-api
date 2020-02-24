import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "src/config/typeorm.config";
import { UsersModule } from "src/users/users.module";
import { GifsModule } from "src/gifs/gifs.module";

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, GifsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
