import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import {
  BadRequestException,
  InternalServerErrorException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import {
  TsuccessMesage,
  successMesage,
} from "src/util/messages/success.message";
import { SignInUserDto } from "./dto/signin-user.dto";
import { JwtPayload } from "src/auth/interfaces/jwt.payload.interface";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUpUser(createUserDto: CreateUserDto): Promise<TsuccessMesage> {
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
        throw new ConflictException("email or username already exist");

      throw new InternalServerErrorException("try later please");
    }

    return successMesage;
  }

  signInUser = async (
    signInUserDto: SignInUserDto,
  ): Promise<JwtPayload | null> => {
    const { login, password } = signInUserDto;
    const user: User = await this.createQueryBuilder("user")
      .where("user.email = :login OR user.username = :login", {
        login,
      })
      .getOne();
    if (!user) throw new BadRequestException();
    const { username, email } = user;
    if (await user.comparePasswords(password)) return { username, email };

    return null;
  };
}
