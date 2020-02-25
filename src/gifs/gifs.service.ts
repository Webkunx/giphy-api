import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import * as superagent from "superagent";
import { baseGifUrl } from "src/config/base-url";
import { FindGifDto } from "./dto/find-gif.dto";
@Injectable()
export class GifsService {
  async findGif(findGifDto: FindGifDto) {
    const { query, limit } = findGifDto;
    const url = baseGifUrl(query, limit);
    try {
      const res = await superagent.get(url).catch(err => {
        throw new InternalServerErrorException();
      });
      const resultData = res.body.data[0].images.downsized_large.url;
      return `<img src="${resultData}">`;
    } catch (e) {
      throw new BadRequestException("Cant find any gif which suits your query");
    }
  }
}
