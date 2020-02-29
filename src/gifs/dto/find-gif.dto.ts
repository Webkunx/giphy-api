import { IsNotEmpty, ValidateIf } from "class-validator";

export class FindGifDto {
  @IsNotEmpty()
  query: string;

  @ValidateIf(e => parseInt(e) !== NaN || e === undefined)
  limit: number;
}
