import {
  Controller,
  Get,
  Inject,
  Query,
  Post,
  Body,
  UseGuards,
  Delete,
  Param,
} from "@nestjs/common";
import { GifsService } from "./gifs.service";
import { FindGifDto } from "./dto/find-gif.dto";
import { GetUserFromRequest } from "../util/decorators/user.decorator";
import { User } from "src/users/user.entity";
import { AuthGuard } from "@nestjs/passport";
import { Gif } from "./gif.entity";
import { FindTopGifsDto } from "./dto/find-top-gifs.dto";
@UseGuards(AuthGuard())
@Controller("gifs")
export class GifsController {
  constructor(@Inject(GifsService) private gifsService: GifsService) {}
  @Get()
  async findGif(@Query() findGifDto: FindGifDto) {
    console.log(findGifDto);

    return this.gifsService.findGif(findGifDto);
  }
  @Post("save")
  async saveGif(
    @Body("url") url: string,
    @GetUserFromRequest() user,
  ): Promise<Gif> {
    return this.gifsService.saveGif(url, user);
  }

  @Get("user")
  async findUserGifs(@GetUserFromRequest() user: User): Promise<Gif[]> {
    return this.gifsService.findUserGifs(user);
  }

  @Get("top")
  async findTopGifs(@Query() findTopGifsDto: FindTopGifsDto): Promise<Gif[]> {
    return this.gifsService.findTopGifs(findTopGifsDto);
  }

  @Delete(":id")
  async removeGif(
    @Param("id") id: string,
    @GetUserFromRequest() user: User,
  ): Promise<string> {
    return this.gifsService.removeGif(id, user);
  }
}
