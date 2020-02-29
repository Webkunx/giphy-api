import { Injectable, BadRequestException } from "@nestjs/common";
import * as superagent from "superagent";
import { baseGifUrl } from "src/config/base-url";
import { FindGifDto } from "./dto/find-gif.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { GifRepository } from "./gif.repository";
import { Gif } from "./gif.entity";
import { User } from "src/users/user.entity";
import { url } from "inspector";
import { FindTopGifsDto } from "./dto/find-top-gifs.dto";
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

    if (found.user.indexOf(user) === -1) {
      delete found.user;
      return found;
    }

    found.user.push(user);
    found.likes += 1;
    await found.save();
    delete found.user;
    return found;
  }

  async findUserGifs(user: User): Promise<Gif[]> {
    return this.gifRepository.find({
      where: { userId: user.id },
    });
  }

  async findTopGifs(findTopGifsDto: FindTopGifsDto): Promise<Gif[]> {
    const { p, limit } = findTopGifsDto;
    return this.gifRepository.find({
      order: { likes: "DESC" },
      take: limit || 10,
      skip: (p - 1) * limit || 0,
    });
  }

  async removeGif(id: string, user: User): Promise<string> {
    const gif: Gif = await this.gifRepository.findOne({
      where: { userId: user.id, id },
    });

    if (!gif) throw new BadRequestException("no gif with this id");
    if (gif.user.length === 1) await gif.remove();
    gif.user.splice(gif.user.indexOf(user), 1);
    await gif.save();
    return "Gif have been successfully deleted";
  }
}
