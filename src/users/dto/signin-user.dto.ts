import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class SignInUserDto {
  @ApiProperty()
  @IsNotEmpty()
  login: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
