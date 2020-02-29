import { Repository, EntityRepository } from "typeorm";
import { Gif } from "./gif.entity";
import { User } from "src/users/user.entity";
import { InternalServerErrorException } from "@nestjs/common";
@EntityRepository(Gif)
export class GifRepository extends Repository<Gif> {
  async createGif(url: string, user: User): Promise<Gif> {
    const gif = new Gif();
    gif.url = url;
    gif.user = [user];
    gif.likes = 1;
    try {
      await gif.save();
    } catch (e) {
      throw new InternalServerErrorException("troubles with saving ");
    }
    delete gif.user;
    return gif;
  }
}
