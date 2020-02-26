import {
  Controller,
  Get,
  Inject,
  Query,
  Post,
  Body,
  UseGuards,
} from "@nestjs/common";
import { GifsService } from "./gifs.service";
import { FindGifDto } from "./dto/find-gif.dto";
import { GetUserFromRequest } from "../util/decorators/user.decorator";
import { User } from "src/users/user.entity";
import { AuthGuard } from "@nestjs/passport";
import { Gif } from "./gif.entity";

@Controller("gifs")
export class GifsController {
  constructor(@Inject(GifsService) private gifsService: GifsService) {}
  @Get()
  async findGif(@Query() findGifDto: FindGifDto) {
    console.log(findGifDto);

    return this.gifsService.findGif(findGifDto);
  }
  @UseGuards(AuthGuard())
  @Post("save")
  async saveGif(
    @Body("url") url: string,
    @GetUserFromRequest() user,
  ): Promise<Gif> {
    return this.gifsService.saveGif(url, user);
  }

  @UseGuards(AuthGuard())
  @Get("user/")
  async findUserGifs(@GetUserFromRequest() user: User): Promise<Gif[]> {
    return this.gifsService.findUserGifs(user);
  }

  @Get("top")
  async getTopGifs() {
    return this.gifsService.getTopGifs();
  }
}
