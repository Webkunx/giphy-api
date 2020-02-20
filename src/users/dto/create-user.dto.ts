import { IsNotEmpty, Min, Max, IsEmail } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @Max(35)
  @Min(6)
  password: string;

  @IsEmail()
  @Max(35)
  email: string;

  @IsNotEmpty()
  username: string;
}
