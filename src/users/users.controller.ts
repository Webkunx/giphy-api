import { Controller, Post, Get, Inject, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("users")
export class UsersController {
  constructor(@Inject(UsersService) private userService: UsersService) {}
  @Post("signup")
  async signUp(@Body() createUserDto: CreateUserDto) {
    // return "signup route";
    return this.userService.signUp(createUserDto);
  }

  @Post("signin")
  async signin(): Promise<string> {
    return "signin route";
  }
}
