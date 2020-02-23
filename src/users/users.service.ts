import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { SignInUserDto } from "./dto/signin-user.dto";
import { JwtPayload } from "src/auth/interfaces/jwt.payload.interface";
import { JwtService } from "@nestjs/jwt";
import { IAccessToken } from "./interfaces/access-token.interface";
import { TsuccessMesage } from "src/util/messages/success.message";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUpUser(createUserDto: CreateUserDto): Promise<TsuccessMesage> {
    return this.userRepository.signUpUser(createUserDto);
  }
  async signInUser(signInUserDto: SignInUserDto): Promise<IAccessToken> {
    const user = await this.userRepository.signInUser(signInUserDto);
    if (!user) throw new UnauthorizedException("Invalid credentials");
    const payload = user;
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
