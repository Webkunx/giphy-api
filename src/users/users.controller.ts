import { Controller, Post, Get, Inject, Body, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { SignInUserDto } from "./dto/signin-user.dto";
import {
  successMesage,
  TsuccessMesage,
} from "src/util/messages/success.message";
import { AuthGuard } from "@nestjs/passport";
import { IAccessToken } from "./interfaces/access-token.interface";

@Controller("users")
export class UsersController {
  constructor(@Inject(UsersService) private userService: UsersService) {}

  @Post("signin")
  async signIn(@Body() signInUserDto: SignInUserDto): Promise<IAccessToken> {
    return this.userService.signInUser(signInUserDto);
  }

  @Post("signup")
  async signUp(@Body() createUserDto: CreateUserDto): Promise<TsuccessMesage> {
    return this.userService.signUpUser(createUserDto);
  }

  @UseGuards(AuthGuard())
  @Get("checkjwt")
  async checkJwt(): Promise<TsuccessMesage> {
    return successMesage;
  }
}
