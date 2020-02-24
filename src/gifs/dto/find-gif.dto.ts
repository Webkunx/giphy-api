import { IsNotEmpty, IsOptional } from "class-validator";

export class FindGifDto {
  @IsNotEmpty()
  query: string;

  @IsOptional()
  limit: number = 1;
}
