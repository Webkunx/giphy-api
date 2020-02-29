import { IsNotEmpty, ValidateIf } from "class-validator";
import { PositiveInt } from "src/util/decorators/validation-decorators/positive-number.decorator";

export class FindGifDto {
  @IsNotEmpty()
  query: string;

  @PositiveInt()
  limit: number;
}
