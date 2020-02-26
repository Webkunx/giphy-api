import { Injectable, BadRequestException } from "@nestjs/common";
import * as superagent from "superagent";
import { baseGifUrl } from "src/config/base-url";
import { FindGifDto } from "./dto/find-gif.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { GifRepository } from "./gif.repository";
import { Gif } from "./gif.entity";
import { User } from "src/users/user.entity";
import { url } from "inspector";
@Injectable()
export class GifsService {
  constructor(
    @InjectRepository(GifRepository) private gifRepository: GifRepository,
  ) {}

  async findGif(findGifDto: FindGifDto) {
    const { query, limit } = findGifDto;
    const urlToFindAGif = baseGifUrl(query, limit);
    try {
      const response = await superagent.get(urlToFindAGif);
      return response.body.data.map(gif => gif.images.downsized_large.url);
    } catch (e) {
      throw new BadRequestException("Cant find any gif which suits your query");
    }
  }

  async saveGif(url: string, user: User): Promise<Gif> {
    const found: Gif = await this.gifRepository.findOne({ where: { url } });

    if (found === undefined) return this.gifRepository.createGif(url, user);

    if (found.user.indexOf(user) === -1) return found;

    found.user.push(user);
    await found.save();
    return found;
  }

  async findUserGifs(user: User) {
    return this.gifRepository.find({
      where: { userId: user.id },
    });
  }
}
