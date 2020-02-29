import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from "class-validator";

export function PositiveInt(
  property?: string,
  validationOptions?: ValidationOptions,
) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: "PositiveInt",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return (
            value == undefined ||
            (parseInt(value) !== NaN && +value > 0 && ~~+value === +value)
          ); // you can return a Promise<boolean> here as well, if you want to make async validation
        },
      },
    });
  };
}
