import { Controller, Post } from "@nestjs/common";

@Controller("users")
export class UsersController {
  @Post("signup")
  async signUp(): Promise<string> {
    return "signup route";
  }

  @Post("signin")
  async signin(): Promise<string> {
    return "signin route";
  }
}
