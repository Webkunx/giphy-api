import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import {
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";

const successMesage = { success: true };
type TsuccessMesage = { success: boolean };

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<TsuccessMesage> {
    const { username, email, password } = createUserDto;

    const user = new User();

    user.salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, user.salt);
    user.username = username;
    user.email = email;

    try {
      await user.save();
    } catch (e) {
      if (parseInt(e.code) === 23505)
        throw new BadRequestException("email or username already exist");

      throw new InternalServerErrorException("try later please");
    }

    return successMesage;
  }
}
