import { createParamDecorator } from "@nestjs/common";

export const GetUserFromRequest = createParamDecorator((data, req) => {
  return req.user;
});
