import { IsNotEmpty } from "class-validator";

export class SignInUserDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  password: string;
}
