import { Module } from "@nestjs/common";
import { GifsController } from "./gifs.controller";
import { GifsService } from "./gifs.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GifRepository } from "./gif.repository";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([GifRepository]), AuthModule],
  controllers: [GifsController],
  providers: [GifsService],
})
export class GifsModule {}
