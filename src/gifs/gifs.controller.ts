import { Controller, Get, Inject, Query } from "@nestjs/common";
import { GifsService } from "./gifs.service";
import { FindGifDto } from "./dto/find-gif.dto";

@Controller("gifs")
export class GifsController {
  constructor(@Inject(GifsService) private gifsService: GifsService) {}
  @Get()
  async findGif(@Query() findGifDto: FindGifDto) {
    return this.gifsService.findGif(findGifDto);
  }
}
