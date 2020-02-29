import { ValidateIf, IsNumberString } from "class-validator";
import { PositiveInt } from "src/util/decorators/validation-decorators/positive-number.decorator";

export class FindTopGifsDto {
  @PositiveInt()
  p: number;
  @PositiveInt()
  limit: number;
}
