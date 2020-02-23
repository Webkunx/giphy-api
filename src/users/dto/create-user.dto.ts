import { IsNotEmpty, Min, Max, IsEmail } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;
}
