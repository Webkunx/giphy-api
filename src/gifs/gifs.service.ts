import { Injectable } from "@nestjs/common";
import * as superagent from "superagent";
import { baseGifUrl } from "src/config/base-url";
import { FindGifDto } from "./dto/find-gif.dto";
@Injectable()
export class GifsService {
  async findGif(findGifDto: FindGifDto) {
    const { query, limit } = findGifDto;
    const url = baseGifUrl(query, limit);
    console.log(url);

    const res = await superagent.get(url);
    const fuckMe = res.body.data[0].images.downsized_large.url;
    return `<img src="${fuckMe}">`;
  }
}
